require 'json'
require 'yaml'
require 'parallel'
require 'builder'
require_relative 'lib/consts'
require_relative 'lib/verse_bundle'

# NOTE utils functions
def text(word_info)
  return unless word_info
  [word_info["eng"], word_info["punct"]].compact.join
end

WORDS_FILES = `find ./verses_data -name words.json`.split

# NOTE index words, output as (in YAML):
# hebrew-123:
#   pos: n
#   candidates:
#     that:
#       - php.2.1|3
#       - gen.1.1|2
#     is:
#       - php.2.1|3
#   translits:
#     hoti:
#       php.2.1|3:
#         - thing,
#         - that
#         - is
def get_words_hash
  bar = ProgressBar.create(title: 'Indexing', total: WORDS_FILES.count)
  WORDS_FILES.each_with_object({}) do |words_file, h|
    verse_key, obj = JSON.parse(File.read(words_file)).to_a.first
    words = obj["words"]
    words.each.with_index do |w, idx|
      ext_verse_key = [verse_key, idx].join('|')
      id = w["id"]
      translit = w["translit"]

      parts = stemmed_parts(w["eng"])
      pos = get_main_pos(w["pos"])
      h[id] ||= {
        pos: pos,
        candidates: {},
        translits: {}
      }

      next unless $STATS_BY_POS.include?(pos)

      parts.each do |candidate|
        h[id][:candidates][candidate] ||= []
        h[id][:candidates][candidate].push(ext_verse_key)
      end

      h[id][:translits][translit] ||= {}
      h[id][:translits][translit][ext_verse_key] = [
        idx == 0 ? nil : text(words[idx-1]),
        text(w),
        text(words[idx+1])
      ]
    end
    bar.increment
  end
end

MAX_SAMPLES = 10

# NOTE detect english roots, output as (in YAML):
# hebrew-123:
#   pos: n
#   meaningsCount: 3
#   occurences: 2
#   meanings:
#     that: # max 10
#       - php.2.1|3
#       - gen.1.1|2
#   translits:
#     hoti: # max 10
#       php.2.1|3:
#         - thing,
#         - that
#         - is
def stats_meanings(words_hash)
  bar = ProgressBar.create(title: 'Meaning', total: words_hash.count)
  words_hash.each do |id, v|
    candidates = v.delete(:candidates)
    if candidates.size > 0
      all_verse_keys = candidates.values.flatten.uniq
      sorted_candidates = candidates.sort_by{ |_,v| -v.size }
      v[:meanings] = sorted_candidates.each_with_object({}) do |kv,h|
        candidate, verse_keys = kv
        vks = verse_keys & all_verse_keys
        h[candidate] = vks.size if vks.size > 0
        all_verse_keys = all_verse_keys - vks
      end
      v[:meaningsCount] = v[:meanings].size
      # v[:meanings] = v[:meanings].first(MAX_SAMPLES).to_h
    end

    if v[:translits].size > 0
      v[:occurences] = v[:translits].values.map(&:keys).flatten.size
      # v[:translits].each do |k, h|
      #   v[:translits][k] = h.to_a.shuffle.first(MAX_SAMPLES).to_h
      # end
    end
    bar.increment
  end

  return words_hash
end

# NOTE save in json and htmls
def save_json_and_html(words_hash)
  File.open("./verses_data/dict.yml", 'w') do |f|
    f << words_hash.to_yaml
  end

  `mkdir -p words`
  Parallel.each(words_hash, progress: 'Saving Words') do |id, v|
    html = Builder::XmlMarkup.new

    if v[:pos]
      html.h3 "詞性"
      html.p $PARTS_OF_SPEECH[v[:pos].to_sym] || v[:pos].upcase
    else
      warn v.inspect
    end

    if v[:occurences]
      html.h3 "聖經中出現次數"
      html.p "共#{v[:occurences]}次"
    else
      html.i "對於聖經中的名詞、動詞、形容詞、副詞，BibleBase會有詳細信息。"
    end

    if v[:meanings]
      html.h3 "上下文意思"
      html.p "共#{v[:meaningsCount]}種"
      html.table do
        v[:meanings].first(MAX_SAMPLES).each do |meaning, c|
          html.tr do
            html.td do
              html.b meaning
            end
            html.td "#{c}次"
          end
        end
      end
    end

    if v[:translits].size > 0
      html.h3 "原文上下文舉例"
      v[:translits].each do |word, occurences|
        html.h4 word
        html.table do
          sampled_occurences = occurences.to_a.shuffle.first(MAX_SAMPLES)
          sampled_occurences.each do |ext_verse_key, words|
            verse_key, idx = ext_verse_key.split('|')
            html.tr do
              html.td do
                verse_link(html, verse_key, :short)
              end
              html.td do
                html.i do
                  if idx.to_i > 1
                    html.span '...'
                  end
                  html.span words[0]
                  html.span " "
                  html.b words[1]
                  html.span " "
                  html.span words[2]
                  if words[2] and !words[2].match(/[\.\?\!]$/)
                    html.span '...'
                  end
                end
              end
            end
          end
        end
      end
    end
    File.open("words/#{id}.htm", 'w'){ |f| f << html}
  end
end

words_hash = get_words_hash()
words_hash = stats_meanings(words_hash)
save_json_and_html(words_hash)