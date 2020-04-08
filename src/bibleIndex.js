const bibleIndex = 
{ 
    1: { abbr: "gen", id: "1", name: "Genesis", title: "創世記", chapters: 50 },
    2: { abbr: "ex", id: "2", name: "Exodus", title: "出埃及記", chapters: 40 },
    3: { abbr: "lev", id: "3", name: "Leviticus", title: "利未記", chapters: 27 },
    4: { abbr: "num", id: "4", name: "Numbers", title: "民數記", chapters: 36 },
    5: { abbr: "deut", id: "5", name: "Deuteronomy", title: "申命記", chapters: 34 },
    6: { abbr: "josh", id: "6", name: "Joshua", title: "約書亞記", chapters: 24 },
    7: { abbr: "judg", id: "7", name: "Judges", title: "士師記", chapters: 21 },
    8: { abbr: "ruth", id: "8", name: "Ruth", title: "路得記", chapters: 4 },
    9: { abbr: "1sam", id: "9", name: "1 Samuel", title: "撒母耳記上", chapters: 31 },
    10: { abbr: "2sam", id: "10", name: "2 Samuel", title: "撒母耳記下", chapters: 24 },
    11: { abbr: "1kings", id: "11", name: "1 Kings", title: "列王紀上", chapters: 22 },
    12: { abbr: "2kings", id: "12", name: "2 Kings", title: "列王記下", chapters: 25 },
    13: { abbr: "1chron", id: "13", name: "1 Chronicles", title: "歷代志上", chapters: 29 },
    14: { abbr: "2chron", id: "14", name: "2 Chronicles", title: "歷代志下", chapters: 36 },
    15: { abbr: "ezra", id: "15", name: "Ezra", title: "以斯拉記", chapters: 10 },
    16: { abbr: "neh", id: "16", name: "Nehemiah", title: "尼希米記", chapters: 13 },
    17: { abbr: "est", id: "17", name: "Esther", title: "以斯帖記", chapters: 10 },
    18: { abbr: "job", id: "18", name: "Job", title: "約伯記", chapters: 42 },
    19: { abbr: "ps", id: "19", name: "Psalms", title: "詩篇", chapters: 150 },
    20: { abbr: "prov", id: "20", name: "Proverbs", title: "箴言", chapters: 31 },
    21: { abbr: "eccles", id: "21", name: "Ecclesiastes", title: "傳道書", chapters: 12 },
    22: { abbr: "song", id: "22", name: "SongOfSongs", title: "雅歌書", chapters: 8 },
    23: { abbr: "isa", id: "23", name: "Isaiah", title: "以賽亞書", chapters: 66 },
    24: { abbr: "jer", id: "24", name: "Jeremiah", title: "耶利米書", chapters: 52 },
    25: { abbr: "lam", id: "25", name: "Lamentations", title: "耶利米哀歌", chapters: 5 },
    26: { abbr: "ezek", id: "26", name: "Ezekiel", title: "以西結書", chapters: 48 },
    27: { abbr: "dan", id: "27", name: "Daniel", title: "但以理書", chapters: 12 },
    28: { abbr: "hos", id: "28", name: "Hosea", title: "何阿西書", chapters: 14 },
    29: { abbr: "joel", id: "29", name: "Joel", title: "約珥書", chapters: 3 },
    30: { abbr: "amos", id: "30", name: "Amos", title: "阿摩司書", chapters: 9 },
    31: { abbr: "obad", id: "31", name: "Obadiah", title: "俄巴底亞書", chapters: 1 },
    32: { abbr: "jonah", id: "32", name: "Jonah", title: "約拿書", chapters: 4 },
    33: { abbr: "mic", id: "33", name: "Micah", title: "彌迦書", chapters: 7 },
    34: { abbr: "nah", id: "34", name: "Nahum", title: "那鴻書", chapters: 3 },
    35: { abbr: "hb", id: "35", name: "Habakkuk", title: "哈巴谷書", chapters: 3 },
    36: { abbr: "zeph", id: "36", name: "Zephaniah", title: "西番雅書", chapters: 3 },
    37: { abbr: "hag", id: "37", name: "Haggai", title: "哈該書", chapters: 2 },
    38: { abbr: "zech", id: "38", name: "Zechariah", title: "撒迦利亞書", chapters: 14 },
    39: { abbr: "mal", id: "39", name: "Malachi", title: "瑪拉基書", chapters: 4 },
    40: { abbr: "matt", id: "40", name: "Matthew", title: "馬太福音", chapters: 28 },
    41: { abbr: "mark", id: "41", name: "Mark", title: "馬可福音", chapters: 16 },
    42: { abbr: "luke", id: "42", name: "Luke", title: "路加福音", chapters: 24 },
    43: { abbr: "john", id: "43", name: "John", title: "約翰福音", chapters: 21 },
    44: { abbr: "acts", id: "44", name: "Acts", title: "使徒行傳", chapters: 28 },
    45: { abbr: "rom", id: "45", name: "Romans", title: "羅馬書", chapters: 16 },
    46: { abbr: "1cor", id: "46", name: "1 Corinthians", title: "哥林多前書", chapters: 16 },
    47: { abbr: "2cor", id: "47", name: "2 Corinthians", title: "哥林多後書", chapters: 13 },
    48: { abbr: "gal", id: "48", name: "Galatians", title: "加拉太書", chapters: 6 },
    49: { abbr: "eph", id: "49", name: "Ephesians", title: "以弗所書", chapters: 6 },
    50: { abbr: "php", id: "50", name: "Philippians", title: "腓力比書", chapters: 4 },
    51: { abbr: "col", id: "51", name: "Colossians", title: "歌羅西書", chapters: 4 },
    52: { abbr: "1thess", id: "52", name: "1 Thessalonians", title: "帖撒羅尼迦前書", chapters: 5 },
    53: { abbr: "2thess", id: "53", name: "2 Thessalonians", title: "帖撒羅尼迦後書", chapters: 3 },
    54: { abbr: "1tim", id: "54", name: "1 Timothy", title: "提摩太前書", chapters: 6 },
    55: { abbr: "2tim", id: "55", name: "2 Timothy", title: "提摩太後書", chapters: 4 },
    56: { abbr: "titus", id: "56", name: "Titus", title: "提多書", chapters: 3 },
    57: { abbr: "philem", id: "57", name: "Philemon", title: "腓利門書", chapters: 1 },
    58: { abbr: "heb", id: "58", name: "Hebrews", title: "希伯來書", chapters: 13 },
    59: { abbr: "james", id: "59", name: "James", title: "雅各書", chapters: 5 },
    60: { abbr: "1pet", id: "60", name: "1 Peter", title: "彼得前書", chapters: 5 },
    61: { abbr: "2pet", id: "61", name: "2 Peter", title: "彼得後書", chapters: 3 },
    62: { abbr: "1john", id: "62", name: "1 John", title: "約翰一書", chapters: 5 },
    63: { abbr: "2john", id: "63", name: "2 John", title: "約翰二書", chapters: 1 },
    64: { abbr: "3jonn", id: "64", name: "3 John", title: "約翰三書", chapters: 1 },
    65: { abbr: "jude", id: "65", name: "Jude", title: "猶大書", chapters: 1 },
    66: { abbr: "rev", id: "66", name: "Revelation", title: "啟示錄", chapters: 22 }
  }

  export { bibleIndex };