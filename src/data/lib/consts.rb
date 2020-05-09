require 'pry'
require 'yaml'
require 'ruby-progressbar'
require_relative 'monkey_patches'

$CHINESE_NUMBERS = "一二三四五六七八九十廿"

$BOOKS = YAML.load_file(File.dirname(__FILE__) +  '/books.yml')
$BOOK_LOOKUP = $BOOKS.each_with_object({}) do |kv, ret|
  key, book = kv
  (book[:full_name] || []).each do |lang, v|
    ret[v] = key
    ret[v.downcase] = key
    ret[v.downcase.snake_case] = key
    ret[v.downcase.kabab_case] = key
    ret[v.downcase.gsub(/\s+/,'')] = key
  end
  (book[:short_name] || []).each do |lang, v|
    ret[v] = key
    ret[v.downcase] = key
    ret[v.downcase.snake_case] = key
    ret[v.downcase.kabab_case] = key
  end
  ret["index_#{book[:index]}"] = key
end
$LANGS = {
  chs: {
    description_fn: -> (book, chapter, verse) { "#{book[:full_name][:chs]}#{chapter}章#{verse}节" },
    short_fn: -> (book, chapter, verse) { "#{book[:short_name][:chs]}#{chapter}:#{verse}" }
  },
  en: {
    description_fn: -> (book, chapter, verse) { "#{book[:full_name][:en]} #{chapter}:#{verse}" },
    short_fn: -> (book, chapter, verse) { "#{book[:short_name][:en]}#{chapter}:#{verse}" }
  }
}
$VERSIONS = {
  cunp: {
    version_id: 'CUNP',
    version_name: '和合本新標點（神版）',
    lang: 'cht',
    bible_com_index: 46
  },
  cnv: {
    version_id: 'CNV',
    version_name: '新譯本',
    lang: 'cht',
    bible_com_index: 40
  },
  ccb: {
    version_id: 'CCB',
    version_name: '圣经当代译本',
    lang: 'chs',
    bible_com_index: 36
  },
  niv: {
    version_id: 'NIV',
    version_name: 'New International Version',
    lang: 'en',
    bible_com_index: 111
  },
  nlt: {
    version_id: 'NLT',
    version_name: 'New Living Translation',
    lang: 'en',
    bible_com_index: 116
  },
  nasb: {
    version_id: 'NASB',
    version_name: 'New American Standard Bible',
    lang: 'en',
    bible_com_index: 100
  }
}

# functions
require 'lemmatizer'
require 'stemmify'
$STOP_WORDS = %w[
  i we you it he she they us me him her
  my our your his their mine them
  myself themselves yourself yourselves himself herself
  be is are was were am been being
  will should shall might would can could may
  do did does
  have has having let begin
  to from in for out at to of on up over down
  away with among against after by through
  within along besides between all under into
  before unto during
  because as but however therefore though then yet
  when while what why whatever which there who whom
  a an the any not o oh
  and s so this that these those also than or
  never man own now day indeed even
  things every anyone everyone if new
  - ‘
  jesus god christ lord holy spirit glory grace eternity
]
$lem = Lemmatizer.new

def get_main_pos(pos)
  pos.split(' | ')
    .map{|k| k.downcase.split(/[^0-9a-z]/).first}
    .sort_by{|k| RARE_WORD_BY_POS.include?(k) ? 0 : 1 }
    .first
end

def stem(word, pos)
  main_word = word.gsub(/\[.+\]/, '').strip
  words = main_word.downcase.split(/[\s'’]+/)
  (words - $STOP_WORDS)
    .map{|w| l = $lem.lemma(w)}
    .join(' ')
end

def verse_url(verse_key)
  bk,c,v = verse_key.split('.')
  b = $BOOKS.dig(bk.downcase.to_sym, :index)
  "/##{[b,c,v].join('/')}"
end
