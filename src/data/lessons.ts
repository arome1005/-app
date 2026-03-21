export interface Lesson {
  id: number;
  title: string;
  chineseTitle?: string;
  question?: string;
  chineseQuestion?: string;
  text?: string;
  vocabulary: { word: string; phonetic: string; meaning: string }[];
  exercise?: string;
  audioUrl?: string;
}

export const NCE1_LESSONS: Lesson[] = [
  {
    id: 1,
    title: "Excuse me!",
    text: "A: Excuse me!\nB: Yes?\nA: Is this your handbag?\nB: Pardon?\nA: Is this your handbag?\nB: Yes, it is. Thank you very much.",
    vocabulary: [
      { word: "excuse", phonetic: "/ɪk'skjuːz/", meaning: "v. 原谅" },
      { word: "me", phonetic: "/miː/", meaning: "pron. 我(宾格)" },
      { word: "yes", phonetic: "/jes/", meaning: "adv. 是的" },
      { word: "is", phonetic: "/ɪz/", meaning: "v. be动词现在时第三人称单数" },
      { word: "this", phonetic: "/ðɪs/", meaning: "pron. 这" },
      { word: "your", phonetic: "/jɔː/", meaning: "adj. 你的，你们的" },
      { word: "handbag", phonetic: "/'hændbæg/", meaning: "n. (女用)手提包" },
      { word: "pardon", phonetic: "/'pɑːdn/", meaning: "int. 原谅，请再说一遍" },
      { word: "it", phonetic: "/ɪt/", meaning: "pron. 它" },
      { word: "thank you", phonetic: "/'θæŋk juː/", meaning: "感谢你" },
      { word: "very much", phonetic: "/'veri mʌtʃ/", meaning: "非常地" }
    ]
  },
  {
    id: 2,
    title: "Is this your...?",
    vocabulary: [
      { word: "pen", phonetic: "/pen/", meaning: "n. 钢笔" },
      { word: "pencil", phonetic: "/'pensl/", meaning: "n. 铅笔" },
      { word: "book", phonetic: "/bʊk/", meaning: "n. 书" },
      { word: "watch", phonetic: "/wɒtʃ/", meaning: "n. 手表" },
      { word: "coat", phonetic: "/kəʊt/", meaning: "n. 上衣，外衣" },
      { word: "dress", phonetic: "/dres/", meaning: "n. 连衣裙" },
      { word: "skirt", phonetic: "/skɜːt/", meaning: "n. 裙子" },
      { word: "shirt", phonetic: "/ʃɜːt/", meaning: "n. 衬衣" },
      { word: "car", phonetic: "/kɑː/", meaning: "n. 小汽车" },
      { word: "house", phonetic: "/haʊs/", meaning: "n. 房子" }
    ],
    exercise: "Written exercise 书面练习\nCopy these sentences.\nExcuse me!\nYes?\nIs this your handbag?\nPardon?\nIs this your handbag?\nYes, it is.\nThank you very much."
  },
  {
    id: 3,
    title: "Sorry, sir.",
    text: "A: My coat and umbrella, please.\nB: Here is my ticket.\nA: Thank you, sir. Number five.\nB: Here's your coat and your umbrella.\nA: Thank you very much.",
    vocabulary: [
      { word: "umbrella", phonetic: "/ʌm'brelə/", meaning: "n. 伞" },
      { word: "please", phonetic: "/pliːz/", meaning: "int. 请" },
      { word: "here", phonetic: "/hɪə/", meaning: "adv. 这里" },
      { word: "ticket", phonetic: "/'tɪkɪt/", meaning: "n. 票" },
      { word: "number", phonetic: "/'nʌmbə/", meaning: "n. 数字" },
      { word: "five", phonetic: "/faɪv/", meaning: "num. 五" },
      { word: "sorry", phonetic: "/'sɒri/", meaning: "adj. 对不起的" },
      { word: "sir", phonetic: "/sɜː/", meaning: "n. 先生" },
      { word: "cloakroom", phonetic: "/'kləʊkruːm/", meaning: "n. 衣帽寄存处" }
    ]
  },
  {
    id: 4,
    title: "Is this your...?",
    vocabulary: [
      { word: "suit", phonetic: "/suːt/", meaning: "n. 一套衣服" },
      { word: "school", phonetic: "/skuːl/", meaning: "n. 学校" },
      { word: "teacher", phonetic: "/'tiːtʃə/", meaning: "n. 老师" },
      { word: "son", phonetic: "/sʌn/", meaning: "n. 儿子" },
      { word: "daughter", phonetic: "/'dɔːtə/", meaning: "n. 女儿" }
    ],
    exercise: "Written exercise 书面练习\nA Copy these sentences.\nThis is not my umbrella.\nSorry, sir.\nIs this your umbrella?\nNo, it isn't.\nB Answer these questions.\nExample:\nIs this your umbrella?\nNo, it isn't my umbrella. It's your umbrella.\n1 Is this your pen?\n2 Is this your pencil?\n3 Is this your book?\n4 Is this your watch?\n5 Is this your coat?\n6 Is this your dress?\n7 Is this your skirt?\n8 Is this your shirt?\n9 Is this your car?\n10 Is this your house?"
  },
  {
    id: 5,
    title: "Nice to meet you.",
    text: "A: Good morning.\nB: Good morning, Mr. Blake.\nA: This is Miss Sophie Dupont. Sophie is a new student. She is French.\nB: Nice to meet you.\nC: Nice to meet you, too.\nA: This is Naoko. She is Japanese. She is a new student, too.\nB: Nice to meet you.\nC: Nice to meet you, too.",
    vocabulary: [
      { word: "good", phonetic: "/gʊd/", meaning: "adj. 好的" },
      { word: "morning", phonetic: "/'mɔːnɪŋ/", meaning: "n. 早晨" },
      { word: "miss", phonetic: "/mɪs/", meaning: "n. 小姐" },
      { word: "new", phonetic: "/njuː/", meaning: "adj. 新的" },
      { word: "student", phonetic: "/'stjuːdnt/", meaning: "n. 学生" },
      { word: "French", phonetic: "/frentʃ/", meaning: "adj. & n. 法国人" },
      { word: "German", phonetic: "/'dʒɜːmən/", meaning: "adj. & n. 德国人" },
      { word: "nice", phonetic: "/naɪs/", meaning: "adj. 美好的" },
      { word: "meet", phonetic: "/miːt/", meaning: "v. 遇见" },
      { word: "too", phonetic: "/tuː/", meaning: "adv. 也" }
    ]
  },
  {
    id: 6,
    title: "What make is it?",
    vocabulary: [
      { word: "make", phonetic: "/meɪk/", meaning: "n. (产品的)牌号" },
      { word: "Swedish", phonetic: "/'swiːdɪʃ/", meaning: "adj. 瑞典的" },
      { word: "English", phonetic: "/'ɪŋglɪʃ/", meaning: "adj. 英国的" },
      { word: "American", phonetic: "/ə'merɪkən/", meaning: "adj. 美国的" },
      { word: "Italian", phonetic: "/ɪ'tæljən/", meaning: "adj. 意大利的" },
      { word: "Volvo", phonetic: "/'vɒlvəʊ/", meaning: "n. 沃尔沃" },
      { word: "Peugeot", phonetic: "/'pɜːʒəʊ/", meaning: "n. 标致" },
      { word: "Mercedes", phonetic: "/mə'seɪdiːz/", meaning: "n. 梅赛德斯" },
      { word: "Toyota", phonetic: "/tɔɪ'əʊtə/", meaning: "n. 丰田" },
      { word: "Daewoo", phonetic: "/'daɪwuː/", meaning: "n. 大宇" },
      { word: "Mini", phonetic: "/'mɪni/", meaning: "n. 迷你" },
      { word: "Ford", phonetic: "/fɔːd/", meaning: "n. 福特" },
      { word: "Fiat", phonetic: "/'fiːæt/", meaning: "n. 菲亚特" }
    ],
    exercise: "Written exercise 书面练习\nA Complete these sentences using He, She or It.\nExample: Stella is a student. She isn't German. She is Spanish.\n1 Alice is a student. ___ isn't German. ___ is French.\n2 This is her car. ___ is a French car.\n3 Hans is a student. ___ isn't French. ___ is German.\n4 This is his car. ___ is a German car.\nB Write questions and answers using He, She, It, a or an.\nExample: This is Miss Sophie Dupont. French/(Swedish)\nIs she a French student or a Swedish student?\nShe isn't a Swedish student. She's a French student."
  },
  {
    id: 7,
    title: "Are you a teacher?",
    text: "A: Are you a teacher?\nB: No, I'm not.\nA: What's your job?\nB: I'm a keyboard operator.\nA: What's your job?\nC: I'm an engineer.",
    vocabulary: [
      { word: "I", phonetic: "/aɪ/", meaning: "pron. 我" },
      { word: "am", phonetic: "/æm/", meaning: "v. be动词现在时第一人称单数" },
      { word: "are", phonetic: "/ɑː/", meaning: "v. be动词现在时复数" },
      { word: "name", phonetic: "/neɪm/", meaning: "n. 名字" },
      { word: "what", phonetic: "/wɒt/", meaning: "pron. & adj. 什么" },
      { word: "job", phonetic: "/dʒɒb/", meaning: "n. 工作" },
      { word: "keyboard", phonetic: "/'kiːbɔːd/", meaning: "n. 键盘" },
      { word: "operator", phonetic: "/'ɒpəreɪtə/", meaning: "n. 操作人员" },
      { word: "engineer", phonetic: "/ˌendʒɪ'nɪə/", meaning: "n. 工程师" }
    ]
  },
  {
    id: 8,
    title: "What's your job?",
    vocabulary: [
      { word: "policeman", phonetic: "/pə'liːsmən/", meaning: "n. 警察" },
      { word: "policewoman", phonetic: "/pə'liːsˌwʊmən/", meaning: "n. 女警察" },
      { word: "taxi driver", phonetic: "/'tæksi 'draɪvə/", meaning: "出租汽车司机" },
      { word: "air hostess", phonetic: "/'eə 'həʊstəs/", meaning: "空中小姐" },
      { word: "postman", phonetic: "/'pəʊstmən/", meaning: "n. 邮递员" },
      { word: "nurse", phonetic: "/nɜːs/", meaning: "n. 护士" },
      { word: "mechanic", phonetic: "/mɪ'kænɪk/", meaning: "n. 机械师" },
      { word: "hairdresser", phonetic: "/'heəˌdresə/", meaning: "n. 理发师" },
      { word: "housewife", phonetic: "/'haʊswaɪf/", meaning: "n. 家庭主妇" },
      { word: "milkman", phonetic: "/'mɪlkmən/", meaning: "n. 送牛奶的人" }
    ],
    exercise: "Written exercise 书面练习\nA Complete these sentences using am or is.\nExample: My name is Xiaohui. I am Chinese.\n1 My name ___ Robert. I ___ a student. I ___ Italian.\n2 Sophie ___ not Italian. She ___ French.\n3 Mr. Blake ___ my teacher. He ___ not French.\nB Write questions and answers using his, her, he, she, a or an."
  },
  {
    id: 9,
    title: "How are you today?",
    text: "A: Hello, Helen.\nB: Hi, Steven.\nA: How are you today?\nB: I'm very well, thank you. And you?\nA: I'm fine, thanks.\nA: How is Tony?\nB: He's fine, thanks. How's Emma?\nA: She's very well, too, Helen.\nA: Goodbye, Helen. Nice to see you.\nB: Goodbye, Steven. Nice to see you, too.",
    vocabulary: [
      { word: "hello", phonetic: "/hə'ləʊ/", meaning: "int. 你好" },
      { word: "hi", phonetic: "/haɪ/", meaning: "int. 你好" },
      { word: "how", phonetic: "/haʊ/", meaning: "adv. 怎样" },
      { word: "today", phonetic: "/tə'deɪ/", meaning: "adv. 今天" },
      { word: "well", phonetic: "/wel/", meaning: "adj. 身体健康的" },
      { word: "fine", phonetic: "/faɪn/", meaning: "adj. 美好的" },
      { word: "thanks", phonetic: "/θæŋks/", meaning: "int. 谢谢" },
      { word: "goodbye", phonetic: "/ˌgʊd'baɪ/", meaning: "int. 再见" },
      { word: "see", phonetic: "/siː/", meaning: "v. 看见" }
    ]
  },
  {
    id: 10,
    title: "Look at that...",
    vocabulary: [
      { word: "fat", phonetic: "/fæt/", meaning: "adj. 胖的" },
      { word: "woman", phonetic: "/'wʊmən/", meaning: "n. 女人" },
      { word: "thin", phonetic: "/θɪn/", meaning: "adj. 瘦的" },
      { word: "tall", phonetic: "/tɔːl/", meaning: "adj. 高的" },
      { word: "short", phonetic: "/ʃɔːt/", meaning: "adj. 矮的" },
      { word: "dirty", phonetic: "/'dɜːti/", meaning: "adj. 脏的" },
      { word: "clean", phonetic: "/kliːn/", meaning: "adj. 干净的" },
      { word: "hot", phonetic: "/hɒt/", meaning: "adj. 热的" },
      { word: "cold", phonetic: "/kəʊld/", meaning: "adj. 冷的" },
      { word: "old", phonetic: "/əʊld/", meaning: "adj. 老的" },
      { word: "young", phonetic: "/jʌŋ/", meaning: "adj. 年轻的" },
      { word: "busy", phonetic: "/'bɪzi/", meaning: "adj. 忙的" },
      { word: "lazy", phonetic: "/'leɪzi/", meaning: "adj. 懒的" }
    ],
    exercise: "Written exercise 书面练习\nA Complete these sentences using He's, She's or It's.\nExample: Robert isn't a teacher. He's an engineer.\n1 Mr. Blake isn't a student. ___ a teacher.\n2 This isn't my umbrella. ___ your umbrella.\n3 Sophie isn't a teacher. ___ a keyboard operator.\nB Write sentences using He or She."
  },
  {
    id: 11,
    title: "Is this your shirt?",
    text: "A: Is this your shirt, Tim?\nB: No, sir. It's not my shirt.\nA: This is my shirt. My shirt's blue.\nA: Is this shirt yours?\nB: No, sir. My shirt's white.\nA: Whose is this shirt?\nC: It's mine, sir.",
    vocabulary: [
      { word: "whose", phonetic: "/huːz/", meaning: "pron. 谁的" },
      { word: "blue", phonetic: "/bluː/", meaning: "adj. 蓝色的" },
      { word: "white", phonetic: "/waɪt/", meaning: "adj. 白色的" },
      { word: "catch", phonetic: "/kætʃ/", meaning: "v. 抓住" }
    ]
  },
  {
    id: 12,
    title: "Whose is this...?",
    vocabulary: [
      { word: "father", phonetic: "/'fɑːðə/", meaning: "n. 父亲" },
      { word: "mother", phonetic: "/'mʌðə/", meaning: "n. 母亲" },
      { word: "blouse", phonetic: "/blaʊz/", meaning: "n. 女衬衫" },
      { word: "sister", phonetic: "/'sɪstə/", meaning: "n. 姐，妹" },
      { word: "tie", phonetic: "/taɪ/", meaning: "n. 领带" },
      { word: "brother", phonetic: "/'bʌðə/", meaning: "n. 兄，弟" },
      { word: "his", phonetic: "/hɪz/", meaning: "possessive adjective 他的" },
      { word: "her", phonetic: "/hɜː/", meaning: "possessive adjective 她的" }
    ],
    exercise: "Written exercise 书面练习\nA Complete these sentences using my, your, his or her.\nExample: Hans is here. That is his car.\n1 Stella is here. That is ___ car.\n2 Excuse me, Steven. Is this ___ umbrella?\n3 I am an air hostess. ___ name is Britt.\n4 Paul is here, too. That is ___ coat.\nB Write questions and answers using 's, his and hers."
  },
  {
    id: 13,
    title: "A new dress",
    text: "A: What colour's your new dress?\nB: It's green. Come upstairs and see it.\nA: Thank you.\nB: Look! Here it is!\nA: That's a nice dress. It's very smart.\nB: My hat's new, too.\nA: What colour is it?\nB: It's the same colour. It's green, too.\nA: That's a lovely hat!",
    vocabulary: [
      { word: "colour", phonetic: "/'kʌlə/", meaning: "n. 颜色" },
      { word: "green", phonetic: "/griːn/", meaning: "adj. 绿色的" },
      { word: "come", phonetic: "/kʌm/", meaning: "v. 来" },
      { word: "upstairs", phonetic: "/ˌʌp'steəz/", meaning: "adv. 楼上" },
      { word: "smart", phonetic: "/smɑːt/", meaning: "adj. 时髦的，漂亮的" },
      { word: "hat", phonetic: "/hæt/", meaning: "n. 帽子" },
      { word: "same", phonetic: "/seɪm/", meaning: "adj. 相同的" },
      { word: "lovely", phonetic: "/'lʌvli/", meaning: "adj. 可爱的" }
    ]
  },
  {
    id: 14,
    title: "What colour is your...?",
    vocabulary: [
      { word: "case", phonetic: "/keɪs/", meaning: "n. 箱子" },
      { word: "carpet", phonetic: "/'kɑːpɪt/", meaning: "n. 地毯" },
      { word: "dog", phonetic: "/dɒg/", meaning: "n. 狗" },
      { word: "customs", phonetic: "/'kʌstəmz/", meaning: "n. 海关" },
      { word: "officer", phonetic: "/'ɒfɪsə/", meaning: "n. 官员" },
      { word: "girl", phonetic: "/gɜːl/", meaning: "n. 女孩，姑娘" },
      { word: "Danish", phonetic: "/'deɪnɪʃ/", meaning: "adj. & n. 丹麦人" },
      { word: "friend", phonetic: "/frend/", meaning: "n. 朋友" },
      { word: "Norwegian", phonetic: "/nɔː'wiːdʒən/", meaning: "adj. & n. 挪威人" },
      { word: "passport", phonetic: "/'pɑːspɔːt/", meaning: "n. 护照" },
      { word: "brown", phonetic: "/braʊn/", meaning: "adj. 褐色的，棕色的" },
      { word: "tourist", phonetic: "/'tʊərɪst/", meaning: "n. 旅游者" }
    ],
    exercise: "Written exercise 书面练习\nA Complete these sentences using my, your, his, her, its, our or their.\nExample: Hans is here. That is his car.\n1 Stella is here. That is ___ car.\n2 We are students. This is ___ school.\n3 They are teachers. That is ___ school.\n4 I am a taxi driver. This is ___ taxi.\n5 You are a postman. This is ___ car.\n6 The dog is here. This is ___ food.\n7 Paul is here. That is ___ coat.\nB Write questions and answers using his, her, its, our and their."
  },
  {
    id: 15,
    title: "Your passports, please.",
    text: "A: Are you customs officers?\nB: No, we aren't. We're tourists.\nA: Your passports, please.\nB: Here they are.\nA: Are you Danish?\nB: No, we aren't. We're Norwegian.\nA: Your cases, please.\nB: Here they are.\nA: Are you friends?\nB: Yes, we are.\nA: That's fine. Thank you very much.",
    vocabulary: [
      { word: "customs", phonetic: "/'kʌstəmz/", meaning: "n. 海关" },
      { word: "officer", phonetic: "/'ɒfɪsə/", meaning: "n. 官员" },
      { word: "tourist", phonetic: "/'tʊərɪst/", meaning: "n. 旅游者" },
      { word: "passport", phonetic: "/'pɑːspɔːt/", meaning: "n. 护照" },
      { word: "Danish", phonetic: "/'deɪnɪʃ/", meaning: "adj. & n. 丹麦人" },
      { word: "Norwegian", phonetic: "/nɔː'wiːdʒən/", meaning: "adj. & n. 挪威人" },
      { word: "friend", phonetic: "/frend/", meaning: "n. 朋友" }
    ]
  },
  {
    id: 16,
    title: "What colour are they?",
    vocabulary: [
      { word: "blue", phonetic: "/bluː/", meaning: "adj. 蓝色的" },
      { word: "white", phonetic: "/waɪt/", meaning: "adj. 白色的" },
      { word: "red", phonetic: "/red/", meaning: "adj. 红色的" },
      { word: "grey", phonetic: "/greɪ/", meaning: "adj. 灰色的" },
      { word: "yellow", phonetic: "/'jeləʊ/", meaning: "adj. 黄色的" },
      { word: "black", phonetic: "/blæk/", meaning: "adj. 黑色的" },
      { word: "orange", phonetic: "/'ɒrɪndʒ/", meaning: "adj. 橘黄色的" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers using his, her, he, she, a or an.\nExample: This is Robert. (policeman)\nWhat's his job?\nHe's a policeman.\n1 This is Sophie. (keyboard operator)\n2 This is Steven. (engineer)\n3 This is Britt. (air hostess)\n4 This is Paul. (mechanic)\nB Write questions and answers using his, her, its, our and their."
  },
  {
    id: 17,
    title: "How do you do?",
    text: "A: Come and meet our employees, Mr. Richards.\nB: Thank you, Mr. Jackson.\nA: This is Nicola Grey, and this is Claire Taylor.\nB: How do you do?\nC: How do you do?\nA: And this is Alice Mott and Linda Hall.\nB: How do you do?\nD: How do you do?\nA: They are very hard-working. What are their jobs?\nB: They are keyboard operators.",
    vocabulary: [
      { word: "employee", phonetic: "/ɪm'plɔɪiː/", meaning: "n. 雇员" },
      { word: "hard-working", phonetic: "/'hɑːdwɜːkɪŋ/", meaning: "adj. 勤奋的" },
      { word: "sales reps", phonetic: "/seɪlz reps/", meaning: "推销员" },
      { word: "man", phonetic: "/mæn/", meaning: "n. 男人" },
      { word: "office", phonetic: "/'ɒfɪs/", meaning: "n. 办公室" },
      { word: "assistant", phonetic: "/ə'sɪstənt/", meaning: "n. 助手" }
    ]
  },
  {
    id: 18,
    title: "What are their jobs?",
    vocabulary: [
      { word: "postman", phonetic: "/'pəʊstmən/", meaning: "n. 邮递员" },
      { word: "postmen", phonetic: "/'pəʊstmən/", meaning: "n. 邮递员(复数)" },
      { word: "milkman", phonetic: "/'mɪlkmən/", meaning: "n. 送牛奶的人" },
      { word: "milkmen", phonetic: "/'mɪlkmən/", meaning: "n. 送牛奶的人(复数)" },
      { word: "policeman", phonetic: "/pə'liːsmən/", meaning: "n. 警察" },
      { word: "policemen", phonetic: "/pə'liːsmən/", meaning: "n. 警察(复数)" },
      { word: "policewoman", phonetic: "/pə'liːsˌwʊmən/", meaning: "n. 女警察" },
      { word: "policewomen", phonetic: "/pə'liːsˌwɪmɪn/", meaning: "女警察(复数)" },
      { word: "customs officer", phonetic: "/'kʌstəmz 'ɒfɪsə/", meaning: "海关官员" },
      { word: "customs officers", phonetic: "/'kʌstəmz 'ɒfɪsəz/", meaning: "海关官员(复数)" },
      { word: "taxi driver", phonetic: "/'tæksi 'draɪvə/", meaning: "出租汽车司机" },
      { word: "taxi drivers", phonetic: "/'tæksi 'draɪvəz/", meaning: "出租汽车司机(复数)" },
      { word: "air hostess", phonetic: "/'eə 'həʊstəs/", meaning: "空中小姐" },
      { word: "air hostesses", phonetic: "/'eə 'həʊstəsɪz/", meaning: "空中小姐(复数)" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers using his, her, he, she, a or an.\nExample: This is Robert. (policeman)\nWhat's his job?\nHe's a policeman.\n1 This is Sophie. (keyboard operator)\n2 This is Steven. (engineer)\n3 This is Britt. (air hostess)\n4 This is Paul. (mechanic)\nB Write questions and answers using his, her, its, our and their."
  },
  {
    id: 19,
    title: "Tired and thirsty",
    text: "A: What's the matter, children?\nB: We're tired... and thirsty, Mum.\nA: Sit down here.\nA: Are you all right now?\nB: No, we aren't.\nA: Look! There's an ice cream man.\nA: Two ice creams, please.\nA: Here you are, children.\nB: Thanks, Mum. These ice creams are nice.\nB: We're all right now.",
    vocabulary: [
      { word: "matter", phonetic: "/'mætə/", meaning: "n. 事情" },
      { word: "children", phonetic: "/'tʃɪldrən/", meaning: "n. 孩子们(复数)" },
      { word: "tired", phonetic: "/'taɪəd/", meaning: "adj. 累，疲倦" },
      { word: "boy", phonetic: "/bɔɪ/", meaning: "n. 男孩" },
      { word: "thirsty", phonetic: "/'θɜːsti/", meaning: "adj. 渴" },
      { word: "mum", phonetic: "/mʌm/", meaning: "n. 妈妈" },
      { word: "sit down", phonetic: "/sɪt daʊn/", meaning: "坐下" },
      { word: "right", phonetic: "/raɪt/", meaning: "adj. 好，可以" },
      { word: "ice cream", phonetic: "/ˌaɪs'kriːm/", meaning: "冰淇淋" }
    ]
  },
  {
    id: 20,
    title: "Look at them!",
    vocabulary: [
      { word: "girl", phonetic: "/gɜːl/", meaning: "n. 女孩" },
      { word: "girls", phonetic: "/gɜːlz/", meaning: "n. 女孩(复数)" },
      { word: "boy", phonetic: "/bɔɪ/", meaning: "n. 男孩" },
      { word: "boys", phonetic: "/bɔɪz/", meaning: "n. 男孩(复数)" },
      { word: "man", phonetic: "/mæn/", meaning: "n. 男人" },
      { word: "men", phonetic: "/men/", meaning: "n. 男人(复数)" },
      { word: "woman", phonetic: "/'wʊmən/", meaning: "n. 女人" },
      { word: "women", phonetic: "/'wɪmɪn/", meaning: "n. 女人(复数)" },
      { word: "student", phonetic: "/'stjuːdnt/", meaning: "n. 学生" },
      { word: "students", phonetic: "/'stjuːdnts/", meaning: "n. 学生(复数)" },
      { word: "teacher", phonetic: "/'tiːtʃə/", meaning: "n. 老师" },
      { word: "teachers", phonetic: "/'tiːtʃəz/", meaning: "n. 老师(复数)" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers using He's, She's or It's.\nExample: Robert isn't a teacher. He's an engineer.\n1 Mr. Blake isn't a student. ___ a teacher.\n2 This isn't my umbrella. ___ your umbrella.\n3 Sophie isn't a teacher. ___ a keyboard operator.\nB Write sentences using He or She."
  },
  {
    id: 21,
    title: "Which book?",
    text: "A: Give me a book, please, Jane.\nB: Which book?\nA: This one?\nB: No, not that one. The red one.\nA: This one?\nB: Yes, please.\nA: Here you are.\nB: Thank you.",
    vocabulary: [
      { word: "give", phonetic: "/gɪv/", meaning: "v. 给" },
      { word: "one", phonetic: "/wʌn/", meaning: "pron. 一个" },
      { word: "which", phonetic: "/wɪtʃ/", meaning: "pron.& adj. 哪一个" }
    ]
  },
  {
    id: 22,
    title: "Which one?",
    vocabulary: [
      { word: "empty", phonetic: "/'empti/", meaning: "adj. 空的" },
      { word: "full", phonetic: "/fʊl/", meaning: "adj. 满的" },
      { word: "large", phonetic: "/lɑːdʒ/", meaning: "adj. 大的" },
      { word: "small", phonetic: "/smɔːl/", meaning: "adj. 小的" },
      { word: "big", phonetic: "/bɪg/", meaning: "adj. 大的" },
      { word: "little", phonetic: "/'lɪtl/", meaning: "adj. 小的" },
      { word: "sharp", phonetic: "/ʃɑːp/", meaning: "adj. 尖的，锋利的" },
      { word: "blunt", phonetic: "/blʌnt/", meaning: "adj. 钝的" },
      { word: "clean", phonetic: "/kliːn/", meaning: "adj. 清洁的" },
      { word: "dirty", phonetic: "/'dɜːti/", meaning: "adj. 脏的" },
      { word: "hot", phonetic: "/hɒt/", meaning: "adj. 热的" },
      { word: "cold", phonetic: "/kəʊld/", meaning: "adj. 冷的" },
      { word: "fat", phonetic: "/fæt/", meaning: "adj. 胖的" },
      { word: "thin", phonetic: "/θɪn/", meaning: "adj. 瘦的" },
      { word: "tall", phonetic: "/tɔːl/", meaning: "adj. 高的" },
      { word: "short", phonetic: "/ʃɔːt/", meaning: "adj. 矮的" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers using which, one, the, and the adjectives in the list.\nExample: desk (large/small)\nGive me a desk, please.\nWhich one? The large one or the small one?\nThe large one, please.\n1 glass (full/empty)\n2 cup (clean/dirty)\n3 bottle (large/small)\n4 box (big/little)\n5 tin (full/empty)\n6 knife (sharp/blunt)\n7 fork (large/small)\n8 spoon (big/little)\n9 pencil (long/short)\nB Write sentences using he, she, it or they."
  },
  {
    id: 23,
    title: "Which glasses?",
    text: "A: Give me some glasses, please, Jane.\nB: Which glasses?\nA: These ones?\nB: No, not those ones. The big ones.\nA: These ones?\nB: Yes, please.\nA: Here you are.\nB: Thank you.",
    vocabulary: [
      { word: "on", phonetic: "/ɒn/", meaning: "prep. 在...之上" },
      { word: "shelf", phonetic: "/ʃelf/", meaning: "n. 架子" }
    ]
  },
  {
    id: 24,
    title: "Which ones?",
    vocabulary: [
      { word: "desk", phonetic: "/desk/", meaning: "n. 课桌" },
      { word: "table", phonetic: "/'teɪbl/", meaning: "n. 桌子" },
      { word: "plate", phonetic: "/pleɪt/", meaning: "n. 盘子" },
      { word: "cup", phonetic: "/kʌp/", meaning: "n. 杯子" },
      { word: "bottle", phonetic: "/'bɒtl/", meaning: "n. 瓶子" },
      { word: "tin", phonetic: "/tɪn/", meaning: "n. 罐头" },
      { word: "knife", phonetic: "/naɪf/", meaning: "n. 刀子" },
      { word: "fork", phonetic: "/fɔːk/", meaning: "n. 叉子" },
      { word: "spoon", phonetic: "/spuːn/", meaning: "n. 勺子" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers using which, ones, the, and the adjectives in the list.\nExample: desks (large/small)\nGive me some desks, please.\nWhich ones? The large ones or the small ones?\nThe large ones, please.\n1 glasses (full/empty)\n2 cups (clean/dirty)\n3 bottles (large/small)\n4 boxes (big/little)\n5 tins (full/empty)\n6 knives (sharp/blunt)\n7 forks (large/small)\n8 spoons (big/little)\n9 pencils (long/short)\nB Write sentences using he, she, it or they."
  },
  {
    id: 25,
    title: "Mrs. Smith's kitchen",
    text: "Mrs. Smith's kitchen is small.\nThere is a refrigerator in the kitchen.\nThe refrigerator is white.\nIt is on the right.\nThere is an electric cooker in the kitchen.\nThe cooker is blue.\nIt is on the left.\nThere is a table in the middle of the room.\nThere is a bottle on the table.\nThe bottle is empty.\nThere is a cup on the table, too.\nThe cup is clean.",
    vocabulary: [
      { word: "refrigerator", phonetic: "/rɪ'frɪdʒəreɪtə/", meaning: "n. 电冰箱" },
      { word: "right", phonetic: "/raɪt/", meaning: "n. 右边" },
      { word: "electric", phonetic: "/ɪ'lektrɪk/", meaning: "adj. 带电的" },
      { word: "cooker", phonetic: "/'kʊkə/", meaning: "n. 炉具" },
      { word: "left", phonetic: "/left/", meaning: "n. 左边" },
      { word: "middle", phonetic: "/'mɪdl/", meaning: "n. 中间" },
      { word: "room", phonetic: "/ruːm/", meaning: "n. 房间" },
      { word: "cup", phonetic: "/kʌp/", meaning: "n. 杯子" }
    ]
  },
  {
    id: 26,
    title: "Where is it?",
    vocabulary: [
      { word: "where", phonetic: "/weə/", meaning: "adv. 在哪里" },
      { word: "in", phonetic: "/ɪn/", meaning: "prep. 在...里面" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers using where, in, on, the and it.\nExample: refrigerator/kitchen\nWhere is the refrigerator?\nIt's in the kitchen.\n1 cup/table\n2 bottle/refrigerator\n3 book/shelf\n4 glass/cupboard\nB Write sentences using he, she, it or they."
  },
  {
    id: 27,
    title: "Mrs. Smith's living room",
    text: "Mrs. Smith's living room is large.\nThere is a television in the room.\nThe television is near the window.\nThere are some magazines on the television.\nThere is a table in the room.\nThere are some newspapers on the table.\nThere are some armchairs in the room.\nThe armchairs are near the table.\nThere is a radio in the room.\nThe radio is near the window.\nThere are some books on the radio.\nThere are some pictures in the room.\nThe pictures are on the wall.",
    vocabulary: [
      { word: "living room", phonetic: "/'lɪvɪŋ ruːm/", meaning: "n. 客厅" },
      { word: "near", phonetic: "/nɪə/", meaning: "prep. 靠近" },
      { word: "window", phonetic: "/'wɪndəʊ/", meaning: "n. 窗户" },
      { word: "armchair", phonetic: "/'ɑːmtʃeə/", meaning: "n. 手扶椅" },
      { word: "door", phonetic: "/dɔː/", meaning: "n. 门" },
      { word: "picture", phonetic: "/'pɪktʃə/", meaning: "n. 图画" },
      { word: "wall", phonetic: "/wɔːl/", meaning: "n. 墙" }
    ]
  },
  {
    id: 28,
    title: "Where are they?",
    vocabulary: [
      { word: "where", phonetic: "/weə/", meaning: "adv. 在哪里" },
      { word: "on", phonetic: "/ɒn/", meaning: "prep. 在...之上" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers using where, on, the and they.\nExample: magazines/television\nWhere are the magazines?\nThey're on the television.\n1 newspapers/table\n2 armchairs/table\n3 books/radio\n4 pictures/wall\nB Write sentences using he, she, it or they."
  },
  {
    id: 29,
    title: "Come in, Amy",
    text: "A: Come in, Amy.\nA: Shut the door, please.\nB: This bedroom's very untidy.\nA: What must I do, Mrs. Jones?\nB: Open the window and air the room.\nB: Then make the bed.\nB: Dust the table.\nB: Then sweep the floor.",
    vocabulary: [
      { word: "shut", phonetic: "/ʃʌt/", meaning: "v. 关门" },
      { word: "bedroom", phonetic: "/'bedruːm/", meaning: "n. 卧室" },
      { word: "untidy", phonetic: "/ʌn'taɪdi/", meaning: "adj. 乱，不整洁" },
      { word: "must", phonetic: "/mʌst/", meaning: "v. aux. 必须" },
      { word: "open", phonetic: "/'əʊpən/", meaning: "v. 开" },
      { word: "air", phonetic: "/eə/", meaning: "v. 使通风" },
      { word: "make", phonetic: "/meɪk/", meaning: "v. 整理" },
      { word: "dust", phonetic: "/dʌst/", meaning: "v. 掸灰" },
      { word: "sweep", phonetic: "/swiːp/", meaning: "v. 打扫" }
    ]
  },
  {
    id: 30,
    title: "What must I do?",
    vocabulary: [
      { word: "empty", phonetic: "/'empti/", meaning: "v. 倒空" },
      { word: "read", phonetic: "/riːd/", meaning: "v. 读" },
      { word: "sharpen", phonetic: "/'ʃɑːpən/", meaning: "v. 削尖" },
      { word: "put on", phonetic: "/pʊt ɒn/", meaning: "穿上" },
      { word: "take off", phonetic: "/teɪk ɒf/", meaning: "脱下" },
      { word: "turn on", phonetic: "/tɜːn ɒn/", meaning: "开(灯)" },
      { word: "turn off", phonetic: "/tɜːn ɒf/", meaning: "关(灯)" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers using what, must, do, the and then.\nExample: open the window/air the room\nWhat must I do?\nOpen the window and then air the room.\n1 shut the door/make the bed\n2 dust the table/sweep the floor\n3 empty the basket/put it on the table\n4 sharpen the pencil/write the letter\n5 turn on the light/read the book\nB Write sentences using he, she, it or they."
  },
  {
    id: 31,
    title: "Where's Sally?",
    text: "A: Where's Sally, Jack?\nB: She's in the garden, Jean.\nA: What's she doing?\nB: She's sitting under the tree.\nA: Is Tim with her?\nB: Yes, he is.\nB: He's climbing the tree.\nA: What's the dog doing?\nB: It's running across the grass.\nB: It's chasing a cat.",
    vocabulary: [
      { word: "garden", phonetic: "/'gɑːdn/", meaning: "n. 花园" },
      { word: "under", phonetic: "/'ʌndə/", meaning: "prep. 在...之下" },
      { word: "tree", phonetic: "/triː/", meaning: "n. 树" },
      { word: "climb", phonetic: "/klaɪm/", meaning: "v. 爬，攀登" },
      { word: "across", phonetic: "/ə'krɒs/", meaning: "prep. 穿过" },
      { word: "grass", phonetic: "/grɑːs/", meaning: "n. 草地" },
      { word: "chase", phonetic: "/tʃeɪs/", meaning: "v. 追赶" }
    ]
  },
  {
    id: 32,
    title: "What's he doing?",
    vocabulary: [
      { word: "eat", phonetic: "/iːt/", meaning: "v. 吃" },
      { word: "drink", phonetic: "/drɪŋk/", meaning: "v. 喝" },
      { word: "sleep", phonetic: "/sliːp/", meaning: "v. 睡觉" },
      { word: "play", phonetic: "/pleɪ/", meaning: "v. 玩" },
      { word: "cook", phonetic: "/kʊk/", meaning: "v. 做饭" },
      { word: "work", phonetic: "/wɜːk/", meaning: "v. 工作" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers using what, doing, he, she, it, the and the verbs in the list.\nExample: Sally/sit under the tree\nWhat's Sally doing?\nShe's sitting under the tree.\n1 Tim/climb the tree\n2 the dog/run across the grass\n3 the cat/run across the wall\n4 the boy/eat an ice cream\n5 the girl/drink some milk\n6 the man/read a newspaper\n7 the woman/cook a meal\nB Write sentences using he, she, it or they."
  },
  {
    id: 33,
    title: "A fine day",
    text: "It is a fine day today.\nThere are some clouds in the sky, but the sun is shining.\nMr. Jones is with his family.\nThey are walking over the bridge.\nThere are some boats on the river.\nMr. Jones and his wife are looking at them.\nSally is looking at a big ship.\nThe ship is going under the bridge.\nTim is looking at an aeroplane.\nThe aeroplane is flying over the river.",
    vocabulary: [
      { word: "sky", phonetic: "/skaɪ/", meaning: "n. 天空" },
      { word: "sun", phonetic: "/sʌn/", meaning: "n. 太阳" },
      { word: "shine", phonetic: "/ʃaɪn/", meaning: "v. 照耀" },
      { word: "with", phonetic: "/wɪð/", meaning: "prep. 和...在一起" },
      { word: "family", phonetic: "/'fæmɪli/", meaning: "n. 家庭" },
      { word: "walk", phonetic: "/wɔːk/", meaning: "v. 走路" },
      { word: "over", phonetic: "/'əʊvə/", meaning: "prep. 跨越，在...之上" },
      { word: "bridge", phonetic: "/brɪdʒ/", meaning: "n. 桥" },
      { word: "boat", phonetic: "/bəʊt/", meaning: "n. 船" },
      { word: "river", phonetic: "/'rɪvə/", meaning: "n. 河" },
      { word: "ship", phonetic: "/ʃɪp/", meaning: "n. 轮船" },
      { word: "aeroplane", phonetic: "/'eərəpleɪn/", meaning: "n. 飞机" },
      { word: "fly", phonetic: "/flaɪ/", meaning: "v. 飞" }
    ]
  },
  {
    id: 34,
    title: "What are they doing?",
    vocabulary: [
      { word: "sleep", phonetic: "/sliːp/", meaning: "v. 睡觉" },
      { word: "shave", phonetic: "/ʃeɪv/", meaning: "v. 刮脸" },
      { word: "wash", phonetic: "/wɒʃ/", meaning: "v. 洗" },
      { word: "wait", phonetic: "/weɪt/", meaning: "v. 等" },
      { word: "jump", phonetic: "/dʒʌmp/", meaning: "v. 跳" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers using what, doing and they.\nExample: the children/sleep\nWhat are the children doing?\nThey're sleeping.\n1 the men/shave\n2 the women/cook a meal\n3 the boys/eat ice creams\n4 the girls/drink some milk\n5 the dogs/run across the grass\n6 the cats/run across the wall\n7 the babies/play\nB Write sentences using he, she, it or they."
  },
  {
    id: 35,
    title: "Our village",
    text: "A: This is a photograph of our village.\nB: Our village is in a valley.\nB: It is between two hills.\nB: The village is on a river.\nA: Here is another photograph of the village.\nB: My wife and I are walking along the banks of the river.\nB: We are on the left.\nB: There is a boy in the water.\nB: He is swimming across the river.\nA: Here is another photograph.\nB: This is the school building.\nB: It is beside a park.\nB: The park is on the right.\nA: Some children are coming out of the building.\nB: Some of them are going into the park.",
    vocabulary: [
      { word: "photograph", phonetic: "/'fəʊtəgrɑːf/", meaning: "n. 照片" },
      { word: "village", phonetic: "/'vɪlɪdʒ/", meaning: "n. 村庄" },
      { word: "valley", phonetic: "/'væli/", meaning: "n. 山谷" },
      { word: "between", phonetic: "/bɪ'twiːn/", meaning: "prep. 在...之间" },
      { word: "hill", phonetic: "/hɪl/", meaning: "n. 小山" },
      { word: "another", phonetic: "/ə'nʌðə/", meaning: "adj. 另一个" },
      { word: "wife", phonetic: "/waɪf/", meaning: "n. 妻子" },
      { word: "along", phonetic: "/ə'lɒŋ/", meaning: "prep. 沿着" },
      { word: "bank", phonetic: "/bæŋk/", meaning: "n. 河岸" },
      { word: "water", phonetic: "/'wɔːtə/", meaning: "n. 水" },
      { word: "swim", phonetic: "/swɪm/", meaning: "v. 游泳" },
      { word: "building", phonetic: "/'bɪldɪŋ/", meaning: "n. 大楼" },
      { word: "park", phonetic: "/pɑːk/", meaning: "n. 公园" },
      { word: "into", phonetic: "/'ɪntuː/", meaning: "prep. 进入" }
    ]
  },
  {
    id: 36,
    title: "Where are they going?",
    vocabulary: [
      { word: "beside", phonetic: "/bɪ'saɪd/", meaning: "prep. 在...旁边" },
      { word: "off", phonetic: "/ɒf/", meaning: "prep. 离开" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers using where, going, into, out of, along, across, off, or under.\nExample: the boy/the river\nWhere is the boy swimming?\nHe's swimming across the river.\n1 the children/the building\n2 the children/the park\n3 the boy/the water\n4 the ship/the bridge\n5 the aeroplane/the river\n6 the boy/the wall\n7 the girl/the ship\n8 the man/the car\nB Write sentences using he, she, it or they."
  },
  {
    id: 37,
    title: "Making a bookcase",
    text: "A: You're working hard, George.\nB: Yes, I am. I'm making a bookcase.\nA: Give me that hammer, please, Dan.\nB: Which hammer? This one?\nA: No, not that one. The big one.\nB: Here you are.\nA: Thanks.",
    vocabulary: [
      { word: "work", phonetic: "/wɜːk/", meaning: "v. 工作" },
      { word: "hard", phonetic: "/hɑːd/", meaning: "adv. 努力地" },
      { word: "make", phonetic: "/meɪk/", meaning: "v. 做" },
      { word: "bookcase", phonetic: "/'bʊkkeɪs/", meaning: "n. 书架，书柜" },
      { word: "hammer", phonetic: "/'hæmə/", meaning: "n. 锤子" },
      { word: "paint", phonetic: "/peɪnt/", meaning: "v. 刷漆" },
      { word: "pink", phonetic: "/pɪŋk/", meaning: "n.& adj. 粉红色" },
      { word: "favourite", phonetic: "/'feɪvərɪt/", meaning: "adj. 最喜爱的" }
    ]
  },
  {
    id: 38,
    title: "What are you doing?",
    vocabulary: [
      { word: "homework", phonetic: "/'həʊmwɜːk/", meaning: "n. 作业" },
      { word: "listen", phonetic: "/'lɪsn/", meaning: "v. 听" },
      { word: "dish", phonetic: "/dɪʃ/", meaning: "n. 盘子，碟子" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers using what, doing, he, she, it, they, the and the verbs in the list.\nExample: Sally/sit under the tree\nWhat's Sally doing?\nShe's sitting under the tree.\n1 George/make a bookcase\n2 the children/do their homework\n3 the women/wash the dishes\n4 the girls/listen to the radio\n5 the boy/paint a bookcase\n6 the men/cook a meal\nB Write sentences using he, she, it or they."
  },
  {
    id: 39,
    title: "Don't drop it!",
    text: "A: What are you going to do with that vase, Penny?\nB: I'm going to put it on this table, Sam.\nA: Don't do that. Give it to me.\nB: What are you going to do with it?\nA: I'm going to put it here, in front of the window.\nB: Be careful! Don't drop it!",
    vocabulary: [
      { word: "vase", phonetic: "/vɑːz/", meaning: "n. 花瓶" },
      { word: "drop", phonetic: "/drɒp/", meaning: "v. 掉下" },
      { word: "flower", phonetic: "/'flaʊə/", meaning: "n. 花" },
      { word: "front", phonetic: "/frʌnt/", meaning: "n. 前面" },
      { word: "in front of", phonetic: "/ɪn frʌnt əv/", meaning: "在...前面" },
      { word: "careful", phonetic: "/'keəfʊl/", meaning: "adj. 小心的" },
      { word: "vase", phonetic: "/vɑːz/", meaning: "n. 花瓶" },
      { word: "drop", phonetic: "/drɒp/", meaning: "v. 掉下" }
    ]
  },
  {
    id: 40,
    title: "What are you going to do?",
    vocabulary: [
      { word: "show", phonetic: "/ʃəʊ/", meaning: "v. 给...看" },
      { word: "send", phonetic: "/send/", meaning: "v. 送" },
      { word: "take", phonetic: "/teɪk/", meaning: "v. 带走" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers using what, going to do, with, put, it, them, on, in, or in front of.\nExample: that vase/this table\nWhat are you going to do with that vase?\nI'm going to put it on this table.\n1 those flowers/that vase\n2 those tickets/my pocket\n3 that teapot/the cupboard\n4 those magazines/that table\n5 that photograph/the wall\n6 those cups/the table\n7 that glass/the cupboard\n8 those knives/the drawer\n9 that bottle/the refrigerator\n10 those spoons/the drawer\nB Write sentences using he, she, it or they."
  },
  {
    id: 41,
    title: "Penny's bag",
    text: "A: Is that your bag, Penny?\nB: No, it isn't. My bag's over there, on the chair.\nA: Is this your bag?\nB: No, it isn't. That's my bag. The one on the floor.\nA: Is it empty?\nB: No, it isn't. It's full.\nA: What's in it?\nB: It's full of books.",
    vocabulary: [
      { word: "cheese", phonetic: "/tʃiːz/", meaning: "n. 乳酪" },
      { word: "bread", phonetic: "/bred/", meaning: "n. 面包" },
      { word: "soap", phonetic: "/səʊp/", meaning: "n. 肥皂" },
      { word: "chocolate", phonetic: "/'tʃɒklət/", meaning: "n. 巧克力" },
      { word: "sugar", phonetic: "/'ʃʊgə/", meaning: "n. 糖" },
      { word: "coffee", phonetic: "/'kɒfi/", meaning: "n. 咖啡" },
      { word: "tea", phonetic: "/tiː/", meaning: "n. 茶" },
      { word: "tobacco", phonetic: "/tə'bækə/", meaning: "n. 烟草" }
    ]
  },
  {
    id: 42,
    title: "Is there any...?",
    vocabulary: [
      { word: "bird", phonetic: "/bɜːd/", meaning: "n. 鸟" },
      { word: "any", phonetic: "/'eni/", meaning: "adj. 任何的" },
      { word: "some", phonetic: "/sʌm/", meaning: "adj. 一些" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers using is there, any, yes, there is, some, no, there isn't, any.\nExample: cheese/plate\nIs there any cheese on the plate?\nYes, there is. There's some cheese on the plate.\n1 bread/table\n2 soap/cupboard\n3 chocolate/box\n4 sugar/glass\n5 coffee/cup\n6 tea/teapot\n7 tobacco/tin\nB Write sentences using he, she, it or they."
  },
  {
    id: 43,
    title: "Hurry up!",
    text: "A: Can you make the tea, Sam?\nB: Yes, of course I can, Penny.\nA: Is there any water in the kettle?\nB: Yes, there is.\nA: Where's the tea?\nB: It's over there, behind the teapot.\nA: Can you see it?\nB: Yes, I can.\nA: Now, Sam.\nA: Be quick!\nA: The kettle's boiling!",
    vocabulary: [
      { word: "of course", phonetic: "/əv 'kɔːs/", meaning: "当然" },
      { word: "kettle", phonetic: "/'ketl/", meaning: "n. 水壶" },
      { word: "behind", phonetic: "/bɪ'haɪnd/", meaning: "prep. 在...后面" },
      { word: "teapot", phonetic: "/'tiːpɒt/", meaning: "n. 茶壶" },
      { word: "now", phonetic: "/naʊ/", meaning: "adv. 现在" },
      { word: "boil", phonetic: "/bɔɪl/", meaning: "v. 沸腾" }
    ]
  },
  {
    id: 44,
    title: "Are there any...?",
    vocabulary: [
      { word: "cupboard", phonetic: "/'kʌbəd/", meaning: "n. 食橱" },
      { word: "shelf", phonetic: "/ʃelf/", meaning: "n. 架子" },
      { word: "shelves", phonetic: "/ʃelvz/", meaning: "n. 架子(复数)" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers using are there, any, yes, there are, some, no, there aren't, any.\nExample: spoons/table\nAre there any spoons on the table?\nYes, there are. There are some spoons on the table.\n1 cups/cupboard\n2 glasses/shelf\n3 knives/drawer\n4 forks/table\n5 plates/cupboard\n6 bottles/refrigerator\n7 tins/shelf\nB Write sentences using he, she, it or they."
  },
  {
    id: 45,
    title: "The boss's letter",
    text: "A: Can you come here, please, Bob?\nB: Yes, sir?\nA: Where's Pamela?\nB: She's next door. She's typing a letter.\nA: Can she type this letter for me?\nB: Yes, sir. I think she can.\nA: Ask her to come here, please.\nB: Yes, sir.\nA: Pamela, can you type this letter for me?\nB: Yes, of course I can, sir.\nA: Here it is.\nB: Thank you, sir.\nA: Bob!\nB: Yes, sir?\nA: I can't read this letter!\nB: Can't you read it, sir?\nA: No, I can't.\nB: I can read it, sir.\nA: Can you?\nB: Yes, sir.\nA: Then read it to me!\nB: 'Dear Boss, I am typing this letter for Pamela. She can't type it! She's next door. She's having a cup of tea!'",
    vocabulary: [
      { word: "can", phonetic: "/kæn/", meaning: "v. aux. 能够" },
      { word: "boss", phonetic: "/bɒs/", meaning: "n. 老板，上司" },
      { word: "letter", phonetic: "/'letə/", meaning: "n. 信" },
      { word: "wake", phonetic: "/weɪk/", meaning: "v. 醒，弄醒" },
      { word: "shoe", phonetic: "/ʃuː/", meaning: "n. 鞋" },
      { word: "arm", phonetic: "/ɑːm/", meaning: "n. 手臂" },
      { word: "hand", phonetic: "/hænd/", meaning: "n. 手" },
      { word: "pocket", phonetic: "/'pɒkɪt/", meaning: "n. 衣袋" },
      { word: "phrase", phonetic: "/freɪz/", meaning: "n. 短语，词组" }
    ]
  },
  {
    id: 46,
    title: "Can you...?",
    vocabulary: [
      { word: "lift", phonetic: "/lɪft/", meaning: "v. 拿起，搬起" },
      { word: "cake", phonetic: "/keɪk/", meaning: "n. 蛋糕" },
      { word: "biscuit", phonetic: "/'bɪskɪt/", meaning: "n. 饼干" },
      { word: "egg", phonetic: "/eg/", meaning: "n. 鸡蛋" },
      { word: "apple", phonetic: "/'æpl/", meaning: "n. 苹果" },
      { word: "orange", phonetic: "/'ɔːrɪndʒ/", meaning: "n. 橘子" },
      { word: "ice cream", phonetic: "/ˌaɪs'kriːm/", meaning: "n. 冰淇淋" },
      { word: "letter", phonetic: "/'letə/", meaning: "n. 信" },
      { word: "basket", phonetic: "/'bɑːskɪt/", meaning: "n. 篮子" },
      { word: "eat", phonetic: "/iːt/", meaning: "v. 吃" },
      { word: "drink", phonetic: "/drɪŋk/", meaning: "v. 喝" },
      { word: "mouth", phonetic: "/maʊθ/", meaning: "n. 嘴" },
      { word: "tongue", phonetic: "/tʌŋ/", meaning: "n. 舌头" },
      { word: "teeth", phonetic: "/tiːθ/", meaning: "n. 牙齿(复数)" },
      { word: "throat", phonetic: "/θrəʊt/", meaning: "n. 喉咙" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers using can and can't.\nExample: Pamela/type this letter (Yes)\nCan Pamela type this letter?\nYes, she can.\n1 Bob/read this letter (Yes)\n2 you/come here (No)\n3 she/type this letter (No)\n4 he/read this letter (No)\n5 you/type this letter (Yes)\nB Write sentences using me, him, her, it, us or them."
  },
  {
    id: 47,
    title: "A cup of coffee",
    text: "A: Do you like coffee, Ann?\nB: Yes, I do.\nA: Do you want a cup?\nB: Yes, please, Christine.\nA: Do you want any sugar?\nB: Yes, please.\nA: Do you want any milk?\nB: No, thank you. I don't like milk in my coffee. I like black coffee.\nA: Do you like biscuits?\nB: Yes, I do.\nA: Do you want one?\nB: Yes, please.",
    vocabulary: [
      { word: "like", phonetic: "/laɪk/", meaning: "v. 喜欢，想要" },
      { word: "want", phonetic: "/wɒnt/", meaning: "v. 想" },
      { word: "fresh", phonetic: "/freʃ/", meaning: "adj. 新鲜的" },
      { word: "egg", phonetic: "/eg/", meaning: "n. 鸡蛋" },
      { word: "butter", phonetic: "/'bʌtə/", meaning: "n. 黄油" },
      { word: "pure", phonetic: "/pjʊə/", meaning: "adj. 纯净的" },
      { word: "honey", phonetic: "/'hʌni/", meaning: "n. 蜂蜜" },
      { word: "ripe", phonetic: "/raɪp/", meaning: "adj. 成熟的" },
      { word: "banana", phonetic: "/bə'nɑːnə/", meaning: "n. 香蕉" },
      { word: "orange", phonetic: "/'ɔːrɪndʒ/", meaning: "n. 橘子" },
      { word: "sweet", phonetic: "/swiːt/", meaning: "adj. 甜的" },
      { word: "ice cream", phonetic: "/ˌaɪs'kriːm/", meaning: "n. 冰淇淋" },
      { word: "whisky", phonetic: "/'wɪski/", meaning: "n. 威士忌" },
      { word: "beer", phonetic: "/bɪə/", meaning: "n. 啤酒" },
      { word: "wine", phonetic: "/waɪn/", meaning: "n. 葡萄酒" },
      { word: "black", phonetic: "/blæk/", meaning: "adj. 黑色的" }
    ]
  },
  {
    id: 48,
    title: "Do you like...?",
    vocabulary: [
      { word: "fresh", phonetic: "/freʃ/", meaning: "adj. 新鲜的" },
      { word: "egg", phonetic: "/eg/", meaning: "n. 鸡蛋" },
      { word: "butter", phonetic: "/'bʌtə/", meaning: "n. 黄油" },
      { word: "pure", phonetic: "/pjʊə/", meaning: "adj. 纯净的" },
      { word: "honey", phonetic: "/'hʌni/", meaning: "n. 蜂蜜" },
      { word: "ripe", phonetic: "/raɪp/", meaning: "adj. 成熟的" },
      { word: "banana", phonetic: "/bə'nɑːnə/", meaning: "n. 香蕉" },
      { word: "orange", phonetic: "/'ɔːrɪndʒ/", meaning: "n. 橘子" },
      { word: "sweet", phonetic: "/swiːt/", meaning: "adj. 甜的" },
      { word: "ice cream", phonetic: "/ˌaɪs'kriːm/", meaning: "n. 冰淇淋" },
      { word: "whisky", phonetic: "/'wɪski/", meaning: "n. 威士忌" },
      { word: "beer", phonetic: "/bɪə/", meaning: "n. 啤酒" },
      { word: "wine", phonetic: "/waɪn/", meaning: "n. 葡萄酒" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers using do you like, yes, I do, no, I don't.\nExample: coffee\nDo you like coffee?\nYes, I do. / No, I don't.\n1 biscuits\n2 milk\n3 honey\n4 beer\n5 bread\n6 tea\n7 butter\nB Write sentences using some or any."
  },
  {
    id: 49,
    title: "At the butcher's",
    text: "A: Do you want any meat today, Mrs. Bird?\nB: Yes, please.\nA: Do you want beef or lamb?\nB: Beef, please.\nA: This lamb's very good.\nB: I have some lamb in my refrigerator.\nA: How about some steak? This steak's very nice.\nB: All right. Give me some steak, please.\nA: Do you want any minced meat?\nB: No, thank you.\nA: My husband doesn't like minced meat.\nB: What about some chicken? My husband likes chicken.\nA: I have some nice chicken today. This chicken's very good.\nB: Give me that chicken, please.\nA: And a pound of steak, too.\nB: Here you are.\nA: How much is that?\nB: It's three pounds.",
    vocabulary: [
      { word: "butcher", phonetic: "/'bʊtʃə/", meaning: "n. 卖肉者" },
      { word: "meat", phonetic: "/miːt/", meaning: "n. 肉" },
      { word: "beef", phonetic: "/biːf/", meaning: "n. 牛肉" },
      { word: "lamb", phonetic: "/læm/", meaning: "n. 羊肉" },
      { word: "husband", phonetic: "/'hʌzbənd/", meaning: "n. 丈夫" },
      { word: "steak", phonetic: "/steɪk/", meaning: "n. 牛排" },
      { word: "mince", phonetic: "/mɪns/", meaning: "n. 肉馅，绞肉" },
      { word: "chicken", phonetic: "/'tʃɪkɪn/", meaning: "n. 鸡" },
      { word: "tell", phonetic: "/tel/", meaning: "v. 告诉" },
      { word: "truth", phonetic: "/truːθ/", meaning: "n. 实话" },
      { word: "either", phonetic: "/'aɪðə/", meaning: "adv. 也(用于否定句)" }
    ]
  },
  {
    id: 50,
    title: "He likes...",
    vocabulary: [
      { word: "tomato", phonetic: "/tə'mɑːtəʊ/", meaning: "n. 西红柿" },
      { word: "potato", phonetic: "/pə'teɪtəʊ/", meaning: "n. 土豆" },
      { word: "cabbage", phonetic: "/'kæbɪdʒ/", meaning: "n. 卷心菜" },
      { word: "lettuce", phonetic: "/'letɪs/", meaning: "n. 莴苣" },
      { word: "pea", phonetic: "/piː/", meaning: "n. 豌豆" },
      { word: "bean", phonetic: "/biːn/", meaning: "n. 豆角" },
      { word: "pear", phonetic: "/peə/", meaning: "n. 梨" },
      { word: "grape", phonetic: "/greɪp/", meaning: "n. 葡萄" },
      { word: "peach", phonetic: "/piːtʃ/", meaning: "n. 桃子" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers using do you want, yes, I do, no, I don't.\nExample: beef/lamb\nDo you want beef or lamb?\nBeef, please.\n1 tea/coffee\n2 apples/oranges\n3 milk/juice\n4 bread/biscuits\nB Write sentences using like, likes, don't like or doesn't like."
  },
  {
    id: 51,
    title: "A pleasant climate",
    text: "A: Where do you come from?\nB: I come from Greece.\nA: What's the climate like in your country?\nB: It's very pleasant.\nA: What's the weather like in spring?\nB: It's often windy in March. It's sometimes warm in April, and it's always warm in May.\nA: What's it like in summer?\nB: It's always hot in June, July and August. The sun shines every day.\nA: Is it cold in autumn?\nB: No, it isn't. It's always warm in September and October.\nA: What's it like in winter?\nB: It's often cold in November, December, January and February. It snows sometimes.",
    vocabulary: [
      { word: "Greece", phonetic: "/griːs/", meaning: "n. 希腊" },
      { word: "climate", phonetic: "/'klaɪmət/", meaning: "n. 气候" },
      { word: "country", phonetic: "/'kʌntri/", meaning: "n. 国家" },
      { word: "pleasant", phonetic: "/'pleznt/", meaning: "adj. 宜人的" },
      { word: "weather", phonetic: "/'weðə/", meaning: "n. 天气" },
      { word: "spring", phonetic: "/sprɪŋ/", meaning: "n. 春季" },
      { word: "windy", phonetic: "/'wɪndi/", meaning: "adj. 有风的" },
      { word: "warm", phonetic: "/wɔːm/", meaning: "adj. 温暖的" },
      { word: "rain", phonetic: "/reɪn/", meaning: "v. 下雨" },
      { word: "snow", phonetic: "/snəʊ/", meaning: "v. 下雪" },
      { word: "January", phonetic: "/'dʒænjuəri/", meaning: "n. 1月" },
      { word: "February", phonetic: "/'februəri/", meaning: "n. 2月" },
      { word: "March", phonetic: "/mɑːtʃ/", meaning: "n. 3月" },
      { word: "April", phonetic: "/'eɪprəl/", meaning: "n. 4月" },
      { word: "May", phonetic: "/meɪ/", meaning: "n. 5月" },
      { word: "June", phonetic: "/dʒuːn/", meaning: "n. 6月" },
      { word: "July", phonetic: "/dʒu'laɪ/", meaning: "n. 7月" },
      { word: "August", phonetic: "/'ɔːgəst/", meaning: "n. 8月" },
      { word: "September", phonetic: "/sep'tembə/", meaning: "n. 9月" },
      { word: "October", phonetic: "/ɒk'təʊbə/", meaning: "n. 10月" },
      { word: "November", phonetic: "/nəʊ'vembə/", meaning: "n. 11月" },
      { word: "December", phonetic: "/dɪ'sembə/", meaning: "n. 12月" }
    ]
  },
  {
    id: 52,
    title: "What's the weather like?",
    vocabulary: [
      { word: "USA", phonetic: "/ˌjuːes'eɪ/", meaning: "n. 美国" },
      { word: "Brazil", phonetic: "/brə'zɪl/", meaning: "n. 巴西" },
      { word: "Holland", phonetic: "/'hɒlənd/", meaning: "n. 荷兰" },
      { word: "England", phonetic: "/'ɪŋglənd/", meaning: "n. 英国" },
      { word: "France", phonetic: "/frɑːns/", meaning: "n. 法国" },
      { word: "Germany", phonetic: "/'dʒɜːməni/", meaning: "n. 德国" },
      { word: "Italy", phonetic: "/'ɪtəli/", meaning: "n. 意大利" },
      { word: "Norway", phonetic: "/'nɔːweɪ/", meaning: "n. 挪威" },
      { word: "Russia", phonetic: "/'rʌʃə/", meaning: "n. 俄罗斯" },
      { word: "Spain", phonetic: "/speɪn/", meaning: "n. 西班牙" },
      { word: "Sweden", phonetic: "/'swiːdn/", meaning: "n. 瑞典" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: Where do you come from? (Greece)\nI come from Greece.\nWhat's the climate like in your country?\nIt's very pleasant.\n1 Where do you come from? (USA)\n2 What's the climate like in your country? (It's very cold in winter and very hot in summer.)\nB Write sentences using sometimes, often, always or never."
  },
  {
    id: 53,
    title: "An interesting climate",
    text: "A: Where do you come from?\nB: I come from England.\nA: What's the climate like in your country?\nB: It's mild, but it's not always pleasant. The weather's often cold in North England and it's often warm in South England.\nA: Which season do you like best?\nB: I like summer best. The days are long and the nights are short. The sun shines every day.",
    vocabulary: [
      { word: "mild", phonetic: "/maɪld/", meaning: "adj. 温和的" },
      { word: "north", phonetic: "/nɔːθ/", meaning: "n. 北方" },
      { word: "south", phonetic: "/saʊθ/", meaning: "n. 南方" },
      { word: "season", phonetic: "/'siːzn/", meaning: "n. 季节" },
      { word: "best", phonetic: "/best/", meaning: "adv. 最" },
      { word: "summer", phonetic: "/'sʌmə/", meaning: "n. 夏季" },
      { word: "autumn", phonetic: "/'ɔːtəm/", meaning: "n. 秋季" },
      { word: "winter", phonetic: "/'wɪntə/", meaning: "n. 冬季" },
      { word: "shines", phonetic: "/ʃaɪnz/", meaning: "v. 照耀" },
      { word: "night", phonetic: "/naɪt/", meaning: "n. 夜晚" },
      { word: "day", phonetic: "/deɪ/", meaning: "n. 白天" }
    ]
  },
  {
    id: 54,
    title: "Which season do you like best?",
    vocabulary: [
      { word: "autumn", phonetic: "/'ɔːtəm/", meaning: "n. 秋季" },
      { word: "winter", phonetic: "/'wɪntə/", meaning: "n. 冬季" },
      { word: "shines", phonetic: "/ʃaɪnz/", meaning: "v. 照耀" },
      { word: "night", phonetic: "/naɪt/", meaning: "n. 夜晚" },
      { word: "day", phonetic: "/deɪ/", meaning: "n. 白天" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: Which season do you like best? (summer)\nI like summer best.\n1 Which season do you like best? (winter)\n2 Which season do you like best? (spring)\n3 Which season do you like best? (autumn)\nB Write sentences using long, short, hot or cold."
  },
  {
    id: 55,
    title: "The Sawyer family",
    text: "The Sawyers live at 87 King Street. In the morning, Mr. Sawyer goes to work and the children go to school. Mrs. Sawyer stays at home. She does the housework. She always eats her lunch at noon. In the afternoon, she usually drinks tea with her friends. In the evening, the children do their homework. Mr. Sawyer reads his newspaper.",
    vocabulary: [
      { word: "live", phonetic: "/lɪv/", meaning: "v. 住，生活" },
      { word: "stay", phonetic: "/steɪ/", meaning: "v. 呆在，停留" },
      { word: "home", phonetic: "/həʊm/", meaning: "n. 家" },
      { word: "housework", phonetic: "/'haʊswɜːk/", meaning: "n. 家务" },
      { word: "lunch", phonetic: "/lʌntʃ/", meaning: "n. 午饭" },
      { word: "noon", phonetic: "/nuːn/", meaning: "n. 中午" },
      { word: "afternoon", phonetic: "/ˌɑːftə'nuːn/", meaning: "n. 下午" },
      { word: "usually", phonetic: "/'juːʒuəli/", meaning: "adv. 通常" },
      { word: "together", phonetic: "/tə'geðə/", meaning: "adv. 一起" },
      { word: "evening", phonetic: "/'iːvnɪŋ/", meaning: "n. 晚上" },
      { word: "arrive", phonetic: "/ə'raɪv/", meaning: "v. 到达" },
      { word: "night", phonetic: "/naɪt/", meaning: "n. 夜间" }
    ]
  },
  {
    id: 56,
    title: "What do they usually do?",
    vocabulary: [
      { word: "arrive", phonetic: "/ə'raɪv/", meaning: "v. 到达" },
      { word: "night", phonetic: "/naɪt/", meaning: "n. 夜间" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: What does Mr. Sawyer usually do in the morning? (go to work)\nHe usually goes to work.\n1 What do the children usually do in the morning? (go to school)\n2 What does Mrs. Sawyer usually do in the morning? (stay at home)\n3 What does she usually do in the afternoon? (drink tea with her friends)\n4 What do the children usually do in the evening? (do their homework)\n5 What does Mr. Sawyer usually do in the evening? (read his newspaper)\nB Write sentences using usually, always or sometimes."
  },
  {
    id: 57,
    title: "An unusual day",
    text: "It is eight o'clock. The children are going to school. They usually go to school by bus. Today, they are going on foot. It is ten o'clock. Mrs. Sawyer is drinking tea. She usually drinks tea in the afternoon. Today, she is drinking tea in the morning. It is four o'clock. The children are coming home from school. They usually come home by bus. Today, they are coming home on foot. It is six o'clock. Mr. Sawyer is arriving home. He usually arrives home late. Today, he is arriving home early.",
    vocabulary: [
      { word: "o'clock", phonetic: "/ə'klɒk/", meaning: "adv. 点钟" },
      { word: "shop", phonetic: "/ʃɒp/", meaning: "v. 购物" },
      { word: "moment", phonetic: "/'məʊmənt/", meaning: "n. 瞬间，时刻" }
    ]
  },
  {
    id: 58,
    title: "What's the time?",
    vocabulary: [
      { word: "o'clock", phonetic: "/ə'klɒk/", meaning: "adv. 点钟" },
      { word: "moment", phonetic: "/'məʊmənt/", meaning: "n. 瞬间，时刻" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: What's the time? (8:00)\nIt's eight o'clock.\n1 What's the time? (10:00)\n2 What's the time? (4:00)\n3 What's the time? (6:00)\nB Write sentences using usually and today."
  },
  {
    id: 59,
    title: "Is that all?",
    text: "A: I want some envelopes, please.\nB: Do you want the large size or the small size?\nA: The large size, please. Do you have any writing paper?\nB: Yes, we do. This is very good writing paper.\nA: I'll take that pad, too. And some glue.\nB: Is that all?\nA: Yes, that's all, thanks.",
    vocabulary: [
      { word: "envelope", phonetic: "/'envələʊp/", meaning: "n. 信封" },
      { word: "writing paper", phonetic: "/'raɪtɪŋ 'peɪpə/", meaning: "n. 信纸" },
      { word: "shop assistant", phonetic: "/'ʃɒp ə'sɪstənt/", meaning: "n. 售货员" },
      { word: "size", phonetic: "/saɪz/", meaning: "n. 尺寸，大小" },
      { word: "pad", phonetic: "/pæd/", meaning: "n. 便笺簿" },
      { word: "glue", phonetic: "/gluː/", meaning: "n. 胶水" },
      { word: "chalk", phonetic: "/tʃɔːk/", meaning: "n. 粉笔" },
      { word: "change", phonetic: "/tʃeɪndʒ/", meaning: "n. 零钱，找给的钱" }
    ]
  },
  {
    id: 60,
    title: "What's the time?",
    vocabulary: [
      { word: "honey", phonetic: "/'hʌni/", meaning: "n. 蜂蜜" },
      { word: "sugar", phonetic: "/'ʃʊgə/", meaning: "n. 糖" },
      { word: "coffee", phonetic: "/'kɒfi/", meaning: "n. 咖啡" },
      { word: "tea", phonetic: "/'tiː/", meaning: "n. 茶" },
      { word: "beer", phonetic: "/'bɪə/", meaning: "n. 啤酒" },
      { word: "wine", phonetic: "/waɪn/", meaning: "n. 酒" },
      { word: "blackboard", phonetic: "/'blækbɔːd/", meaning: "n. 黑板" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: What's the time? (1:00)\nIt's one o'clock.\n1 What's the time? (2:00)\n2 What's the time? (3:00)\nB Write sentences using some or any."
  },
  {
    id: 61,
    title: "A bad cold",
    text: "A: Where's Jimmy today?\nB: He's in bed. He has a bad cold.\nA: Has he seen a doctor?\nB: Yes, he has. The doctor says he must stay in bed for a week.\nA: Can I see him?\nB: No, you can't. He's sleeping now.",
    vocabulary: [
      { word: "feel", phonetic: "/fiːl/", meaning: "v. 感觉" },
      { word: "look", phonetic: "/lʊk/", meaning: "v. 看上去" },
      { word: "must", phonetic: "/mʌst/", meaning: "modal verb 必须，一定" },
      { word: "call", phonetic: "/kɔːl/", meaning: "v. 叫，请" },
      { word: "doctor", phonetic: "/'dɒktə/", meaning: "n. 医生" },
      { word: "mouth", phonetic: "/maʊθ/", meaning: "n. 嘴" },
      { word: "tongue", phonetic: "/tʌŋ/", meaning: "n. 舌头" },
      { word: "bad", phonetic: "/bæd/", meaning: "adj. 坏的，严重的" },
      { word: "cold", phonetic: "/kəʊld/", meaning: "n. 感冒" },
      { word: "news", phonetic: "/njuːz/", meaning: "n. 消息" }
    ]
  },
  {
    id: 62,
    title: "What's the matter?",
    vocabulary: [
      { word: "headache", phonetic: "/'hedeɪk/", meaning: "n. 头痛" },
      { word: "aspirin", phonetic: "/'æsprɪn/", meaning: "n. 阿司匹林" },
      { word: "earache", phonetic: "/'ɪəreɪk/", meaning: "n. 耳痛" },
      { word: "toothache", phonetic: "/'tuːθeɪk/", meaning: "n. 牙痛" },
      { word: "dentist", phonetic: "/'dentɪst/", meaning: "n. 牙医" },
      { word: "stomach ache", phonetic: "/'stʌməkeɪk/", meaning: "n. 胃痛" },
      { word: "medicine", phonetic: "/'medsən/", meaning: "n. 药" },
      { word: "temperature", phonetic: "/'temprətʃə/", meaning: "n. 温度" },
      { word: "flu", phonetic: "/fluː/", meaning: "n. 流感" },
      { word: "measles", phonetic: "/'miːzlz/", meaning: "n. 麻疹" },
      { word: "mumps", phonetic: "/mʌmps/", meaning: "n. 腮腺炎" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: What's the matter with him? (headache)\nHe has a headache.\nWhat must he do? (take an aspirin)\nHe must take an aspirin.\n1 What's the matter with her? (earache)\n2 What must she do? (see a doctor)\nB Write sentences using must."
  },
  {
    id: 63,
    title: "Thank you, doctor.",
    text: "A: How's Jimmy today, Mrs. Williams?\nB: He's much better, thank you, doctor.\nA: Can he get up now?\nB: Yes, he can. But he mustn't go out. It's still very cold.\nA: All right. I'll see him again tomorrow.",
    vocabulary: [
      { word: "better", phonetic: "/'betə/", meaning: "adj. 较好的" },
      { word: "certainly", phonetic: "/'sɜːtnli/", meaning: "adv. 当然" },
      { word: "get up", phonetic: "/get ʌp/", meaning: "起床" },
      { word: "yet", phonetic: "/jet/", meaning: "adv. 还，仍" },
      { word: "rich", phonetic: "/rɪtʃ/", meaning: "adj. 有钱的" },
      { word: "food", phonetic: "/fuːd/", meaning: "n. 食物" },
      { word: "remain", phonetic: "/rɪ'meɪn/", meaning: "v. 保持，继续" }
    ]
  },
  {
    id: 64,
    title: "What must they do?",
    vocabulary: [
      { word: "play", phonetic: "/pleɪ/", meaning: "v. 玩" },
      { word: "match", phonetic: "/mætʃ/", meaning: "n. 火柴" },
      { word: "talk", phonetic: "/tɔːk/", meaning: "v. 谈话" },
      { word: "library", phonetic: "/'laɪbrəri/", meaning: "n. 图书馆" },
      { word: "drive", phonetic: "/draɪv/", meaning: "v. 开车" },
      { word: "quickly", phonetic: "/'kwɪkli/", meaning: "adv. 快地" },
      { word: "lean out of", phonetic: "/liːn aʊt ɒv/", meaning: "身体探出" },
      { word: "break", phonetic: "/breɪk/", meaning: "v. 打破" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: What must they do? (not play with matches)\nThey mustn't play with matches.\n1 What must they do? (not talk in the library)\n2 What must he do? (not drive quickly)\n3 What must she do? (not lean out of the window)\nB Write sentences using mustn't."
  },
  {
    id: 65,
    title: "Not a baby",
    text: "A: What are you going to do this evening, Jill?\nB: I'm going to see a film.\nA: Who are you going to go with?\nB: I'm going to go with my friend, Penny.\nA: You mustn't be late. You must be home at ten o'clock.\nB: I'm not a baby!",
    vocabulary: [
      { word: "dad", phonetic: "/dæd/", meaning: "n. 爸(儿语)" },
      { word: "key", phonetic: "/kiː/", meaning: "n. 钥匙" },
      { word: "baby", phonetic: "/'beɪbi/", meaning: "n. 婴儿" },
      { word: "hear", phonetic: "/hɪə/", meaning: "v. 听见" },
      { word: "enjoy", phonetic: "/ɪn'dʒɔɪ/", meaning: "v. 玩得快活" },
      { word: "themselves", phonetic: "/ðəm'selvz/", meaning: "pron. 他们自己" },
      { word: "ourselves", phonetic: "/aʊə'selvz/", meaning: "pron. 我们自己" },
      { word: "myself", phonetic: "/maɪ'self/", meaning: "pron. 我自己" },
      { word: "yourself", phonetic: "/jɔː'self/", meaning: "pron. 你自己" },
      { word: "himself", phonetic: "/hɪm'self/", meaning: "pron. 他自己" },
      { word: "herself", phonetic: "/hɜː'self/", meaning: "pron. 她自己" },
      { word: "itself", phonetic: "/ɪt'self/", meaning: "pron. 它自己" }
    ]
  },
  {
    id: 66,
    title: "What's the time?",
    vocabulary: [
      { word: "station", phonetic: "/'steɪʃn/", meaning: "n. 车站" },
      { word: "train", phonetic: "/treɪn/", meaning: "n. 火车" },
      { word: "platform", phonetic: "/'plætfɔːm/", meaning: "n. 站台" },
      { word: "plenty", phonetic: "/'plenti/", meaning: "n. 大量" },
      { word: "bar", phonetic: "/bɑː/", meaning: "n. 酒吧" },
      { word: "station master", phonetic: "/'steɪʃn 'mɑːstə/", meaning: "n. 站长" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: What's the time? (10:00)\nIt's ten o'clock.\n1 What's the time? (11:00)\n2 What's the time? (12:00)\nB Write sentences using myself, yourself, himself, herself, itself, ourselves, yourselves or themselves."
  },
  {
    id: 67,
    title: "The weekend",
    text: "A: Hello, were you at the butcher's?\nB: No, I wasn't. I was at the greengrocer's.\nA: Were there any apples?\nB: Yes, there were. They were very good.\nA: How much were they?\nB: They were two pounds a kilo.",
    vocabulary: [
      { word: "greengrocer", phonetic: "/'griːnˌgrəʊsə/", meaning: "n. 蔬菜水果零售商" },
      { word: "absent", phonetic: "/'æbsənt/", meaning: "adj. 缺席的" },
      { word: "Monday", phonetic: "/'mʌndi/", meaning: "n. 星期一" },
      { word: "Tuesday", phonetic: "/'tjuːzdi/", meaning: "n. 星期二" },
      { word: "Wednesday", phonetic: "/'wenzdi/", meaning: "n. 星期三" },
      { word: "Thursday", phonetic: "/'θɜːzdi/", meaning: "n. 星期四" },
      { word: "Friday", phonetic: "/'fraɪdi/", meaning: "n. 星期五" },
      { word: "Saturday", phonetic: "/'sætədi/", meaning: "n. 星期六" },
      { word: "Sunday", phonetic: "/'sʌndi/", meaning: "n. 星期日" }
    ]
  },
  {
    id: 68,
    title: "What's the time?",
    vocabulary: [
      { word: "church", phonetic: "/tʃɜːtʃ/", meaning: "n. 教堂" },
      { word: "dairy", phonetic: "/'deəri/", meaning: "n. 牛奶店" },
      { word: "baker", phonetic: "/'beɪkə/", meaning: "n. 面包店" },
      { word: "grocer", phonetic: "/'grəʊsə/", meaning: "n. 食品杂货店" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: Were you at the butcher's on Monday? (No/at the greengrocer's)\nNo, I wasn't. I was at the greengrocer's.\n1 Were you at the baker's on Tuesday? (No/at the dairy)\n2 Were you at the grocer's on Wednesday? (No/at the butcher's)\nB Write sentences using was or were."
  },
  {
    id: 69,
    title: "The car race",
    text: "There is a car race near our town every year. In 1995, there was a very big race. There were hundreds of people there. My wife and I were at the race. We were near the start. There were twenty cars in the race. There were English cars, French cars, German cars, Italian cars, American cars and Japanese cars. It was an exciting race.",
    vocabulary: [
      { word: "year", phonetic: "/jɪə/", meaning: "n. 年" },
      { word: "race", phonetic: "/reɪs/", meaning: "n. 比赛" },
      { word: "town", phonetic: "/taʊn/", meaning: "n. 城镇" },
      { word: "crowd", phonetic: "/kraʊd/", meaning: "n. 人群" },
      { word: "stand", phonetic: "/stænd/", meaning: "v. 站立" },
      { word: "exciting", phonetic: "/ɪk'saɪtɪŋ/", meaning: "adj. 使人兴奋的" },
      { word: "just", phonetic: "/dʒʌst/", meaning: "adv. 正好，恰好" },
      { word: "finish", phonetic: "/'fɪnɪʃ/", meaning: "n. 结尾，结束" },
      { word: "winner", phonetic: "/'wɪnə/", meaning: "n. 胜利者" },
      { word: "behind", phonetic: "/bɪ'haɪnd/", meaning: "prep. 在...之后" },
      { word: "way", phonetic: "/weɪ/", meaning: "n. 路途" }
    ]
  },
  {
    id: 70,
    title: "When were they there?",
    vocabulary: [
      { word: "station", phonetic: "/'steɪʃn/", meaning: "n. 车站" },
      { word: "Denmark", phonetic: "/'denmɑːk/", meaning: "n. 丹麦" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: When were they at the station? (in 1995)\nThey were at the station in 1995.\n1 When were they in Denmark? (in 1990)\n2 When were they in London? (in 1985)\nB Write sentences using was or were."
  },
  {
    id: 71,
    title: "He's awful!",
    text: "A: What's the matter, Jane?\nB: I'm looking for my crystal glass. I can't find it anywhere.\nA: Is it in the cupboard?\nB: No, it isn't. I've looked in the cupboard.\nA: Is it on the table?\nB: No, it isn't. I've looked on the table.\nA: Look! It's in your hand!",
    vocabulary: [
      { word: "awful", phonetic: "/'ɔːfʊl/", meaning: "adj. 极坏的" },
      { word: "telephone", phonetic: "/'telɪfəʊn/", meaning: "v.& n. 打电话；电话" },
      { word: "time", phonetic: "/taɪm/", meaning: "n. 次(数)" },
      { word: "answer", phonetic: "/'ɑːnsə/", meaning: "v. 接(电话)" },
      { word: "last", phonetic: "/lɑːst/", meaning: "adj. 最近的，上一个的" },
      { word: "phone", phonetic: "/fəʊn/", meaning: "n. 电话" },
      { word: "again", phonetic: "/ə'gen/", meaning: "adv. 又，再" },
      { word: "say", phonetic: "/seɪ/", meaning: "v. 说" }
    ]
  },
  {
    id: 72,
    title: "When were they there?",
    vocabulary: [
      { word: "cupboard", phonetic: "/'kʌpbəd/", meaning: "n. 食橱" },
      { word: "table", phonetic: "/'teɪbl/", meaning: "n. 桌子" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: Where was the crystal glass? (in the cupboard)\nIt was in the cupboard.\n1 Where was the book? (on the table)\n2 Where was the telephone? (in the hall)\nB Write sentences using have or has."
  },
  {
    id: 73,
    title: "The way to King Street",
    text: "A: Can you tell me the way to King Street, please?\nB: Yes. Go straight ahead. Turn left at the first turning. Then go straight ahead. King Street is on the right.",
    vocabulary: [
      { word: "week", phonetic: "/wiːk/", meaning: "n. 周" },
      { word: "London", phonetic: "/'lʌndən/", meaning: "n. 伦敦" },
      { word: "suddenly", phonetic: "/'sʌdənli/", meaning: "adv. 突然地" },
      { word: "bus stop", phonetic: "/'bʌs stɒp/", meaning: "n. 公共汽车站" },
      { word: "smile", phonetic: "/smaɪl/", meaning: "v. 微笑" },
      { word: "pleasantly", phonetic: "/'plezntli/", meaning: "adv. 愉快地" },
      { word: "understand", phonetic: "/ˌʌndə'stænd/", meaning: "v. 懂，明白" },
      { word: "speak", phonetic: "/spiːk/", meaning: "v. 讲，说" },
      { word: "hand", phonetic: "/hænd/", meaning: "n. 手" },
      { word: "pocket", phonetic: "/'pɒkɪt/", meaning: "n. 衣袋" },
      { word: "phrasebook", phonetic: "/'freɪzbʊk/", meaning: "n. 短语手册，会话手册" },
      { word: "phrase", phonetic: "/freɪz/", meaning: "n. 短语" },
      { word: "slowly", phonetic: "/'sləʊli/", meaning: "adv. 缓慢地" }
    ]
  },
  {
    id: 74,
    title: "What's the time?",
    vocabulary: [
      { word: "hurry", phonetic: "/'hʌri/", meaning: "v. 赶紧" },
      { word: "ticket", phonetic: "/'tɪkɪt/", meaning: "n. 票" },
      { word: "number", phonetic: "/'nʌmbə/", meaning: "n. 号码" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: What's the time? (7:00)\nIt's seven o'clock.\n1 What's the time? (8:00)\n2 What's the time? (9:00)\nB Write sentences using the past tense of the verbs."
  },
  {
    id: 75,
    title: "Uncomfortable shoes",
    text: "A: Do you have any shoes like these?\nB: What size, madam?\nA: Size five.\nB: What colour?\nA: Black.\nB: I'm sorry. We don't have any black shoes in size five. But we have some blue shoes in size five.\nA: Can I try them on?\nB: Yes, of course.",
    vocabulary: [
      { word: "ago", phonetic: "/ə'gəʊ/", meaning: "adv. 以前" },
      { word: "buy", phonetic: "/baɪ/", meaning: "v. 买" },
      { word: "pair", phonetic: "/peə/", meaning: "n. 双，对" },
      { word: "fashion", phonetic: "/'fæʃn/", meaning: "n. (服装的)流行式样" },
      { word: "uncomfortable", phonetic: "/ʌn'kʌmfətəbl/", meaning: "adj. 不舒服的" },
      { word: "wear", phonetic: "/weə/", meaning: "v. 穿着" }
    ]
  },
  {
    id: 76,
    title: "When did you...?",
    vocabulary: [
      { word: "yesterday", phonetic: "/'jestədeɪ/", meaning: "n. 昨天" },
      { word: "last week", phonetic: "/lɑːst wiːk/", meaning: "上周" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: When did you buy those shoes? (yesterday)\nI bought them yesterday.\n1 When did you buy that car? (last week)\n2 When did you buy that house? (two years ago)\nB Write sentences using the past tense of the verbs."
  },
  {
    id: 77,
    title: "Terrible toothache",
    text: "A: What's the matter, Nurse?\nB: I have a terrible toothache.\nA: You must see a dentist.\nB: I've seen a dentist, but he can't see me today.\nA: Why not?\nB: He's very busy.",
    vocabulary: [
      { word: "appointment", phonetic: "/ə'pɔɪntmənt/", meaning: "n. 约会，预约" },
      { word: "urgent", phonetic: "/'ɜːdʒənt/", meaning: "adj. 紧急的，急迫的" },
      { word: "till", phonetic: "/tɪl/", meaning: "prep. 直到...为止" }
    ]
  },
  {
    id: 78,
    title: "When did you...?",
    vocabulary: [
      { word: "morning", phonetic: "/'mɔːnɪŋ/", meaning: "n. 早晨" },
      { word: "afternoon", phonetic: "/ˌɑːftə'nuːn/", meaning: "n. 下午" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: When did you see the dentist? (this morning)\nI saw him this morning.\n1 When did you see the doctor? (this afternoon)\n2 When did you see the nurse? (yesterday)\nB Write sentences using the past tense of the verbs."
  },
  {
    id: 79,
    title: "Carol's shopping list",
    text: "A: What do we need, Carol?\nB: We need some groceries. We need some butter, some eggs and some flour. We need some honey, too.\nA: Do we need any vegetables?\nB: Yes, we do. We need some potatoes, some cabbage and some lettuce.\nA: What about fruit?\nB: We need some apples and some oranges.",
    vocabulary: [
      { word: "shopping", phonetic: "/'ʃɒpɪŋ/", meaning: "n. 购物" },
      { word: "list", phonetic: "/lɪst/", meaning: "n. 清单" },
      { word: "vegetable", phonetic: "/'vedʒtəbl/", meaning: "n. 蔬菜" },
      { word: "grocery", phonetic: "/'grəʊsəri/", meaning: "n. 食品杂货" },
      { word: "fruit", phonetic: "/fruːt/", meaning: "n. 水果" },
      { word: "butter", phonetic: "/'bʌtə/", meaning: "n. 黄油" },
      { word: "honey", phonetic: "/'hʌni/", meaning: "n. 蜂蜜" },
      { word: "egg", phonetic: "/eg/", meaning: "n. 鸡蛋" },
      { word: "flour", phonetic: "/'flaʊə/", meaning: "n. 面粉" },
      { word: "potato", phonetic: "/pə'teɪtəʊ/", meaning: "n. 土豆" },
      { word: "cabbage", phonetic: "/'kæbɪdʒ/", meaning: "n. 卷心菜" },
      { word: "lettuce", phonetic: "/'letɪs/", meaning: "n. 莴苣" },
      { word: "orange", phonetic: "/'ɒrɪndʒ/", meaning: "n. 柑橘" }
    ]
  },
  {
    id: 80,
    title: "I must go to the...",
    vocabulary: [
      { word: "grocer", phonetic: "/'grəʊsə/", meaning: "n. 食品杂货商" },
      { word: "greengrocer", phonetic: "/'griːnˌgrəʊsə/", meaning: "n. 蔬菜水果零售商" },
      { word: "butcher", phonetic: "/'bʊtʃə/", meaning: "n. 屠夫" },
      { word: "baker", phonetic: "/'beɪkə/", meaning: "n. 面包师" },
      { word: "chemist", phonetic: "/'kemɪst/", meaning: "n. 药剂师" },
      { word: "stationer", phonetic: "/'steɪʃənə/", meaning: "n. 文具商" },
      { word: "newsagent", phonetic: "/'njuːzˌeɪdʒənt/", meaning: "n. 报刊零售人" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: Where must you go to buy some butter? (the grocer's)\nI must go to the grocer's.\n1 Where must you go to buy some tea? (the grocer's)\n2 Where must you go to buy some bread? (the baker's)\n3 Where must you go to buy some meat? (the butcher's)\nB Write sentences using must."
  },
  {
    id: 81,
    title: "Roast beef!",
    text: "A: What are we going to have for dinner, Carol?\nB: Roast beef.\nA: Roast beef! That's my favourite dinner.\nB: I'm going to cook it now.\nA: Can I help you?\nB: Yes, please. You can peel the potatoes.\nA: I'll do that.\nB: And you can wash the lettuce.\nA: All right.",
    vocabulary: [
      { word: "roast", phonetic: "/rəʊst/", meaning: "v. 烤" },
      { word: "beef", phonetic: "/biːf/", meaning: "n. 牛肉" },
      { word: "pork", phonetic: "/pɔːk/", meaning: "n. 猪肉" },
      { word: "lamb", phonetic: "/læm/", meaning: "n. 羔羊肉" },
      { word: "favourite", phonetic: "/'feɪvərɪt/", meaning: "adj. 最喜爱的" },
      { word: "cook", phonetic: "/kʊk/", meaning: "v. 烹调" },
      { word: "peel", phonetic: "/piːl/", meaning: "v. 剥皮" },
      { word: "wash", phonetic: "/wɒʃ/", meaning: "v. 洗" },
      { word: "lettuce", phonetic: "/'letɪs/", meaning: "n. 莴苣" },
      { word: "bean", phonetic: "/biːn/", meaning: "n. 豆角" },
      { word: "pear", phonetic: "/peə/", meaning: "n. 梨" },
      { word: "grape", phonetic: "/greɪp/", meaning: "n. 葡萄" },
      { word: "peach", phonetic: "/piːtʃ/", meaning: "n. 桃子" }
    ]
  },
  {
    id: 82,
    title: "I had...",
    vocabulary: [
      { word: "dinner", phonetic: "/'dɪnə/", meaning: "n. 正餐" },
      { word: "lunch", phonetic: "/lʌntʃ/", meaning: "n. 午饭" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: What did you have for dinner? (roast beef)\nI had roast beef.\n1 What did you have for lunch? (some fish)\n2 What did you have for breakfast? (two eggs)\nB Write sentences using the past tense of have."
  },
  {
    id: 83,
    title: "Going on holiday",
    text: "A: Where are you going for your holidays, Sam?\nB: I'm going to Italy.\nA: How are you going there?\nB: I'm going by car.\nA: Who are you going with?\nB: I'm going with my wife and children.\nA: When are you going?\nB: We're going in August.",
    vocabulary: [
      { word: "holiday", phonetic: "/'hɒlədeɪ/", meaning: "n. 假期" },
      { word: "Italy", phonetic: "/'ɪtəli/", meaning: "n. 意大利" }
    ]
  },
  {
    id: 84,
    title: "Have you had...?",
    vocabulary: [
      { word: "holiday", phonetic: "/'hɒlədeɪ/", meaning: "n. 假期" },
      { word: "Italy", phonetic: "/'ɪtəli/", meaning: "n. 意大利" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: Have you had your holiday yet? (Yes/in August)\nYes, I have. I had it in August.\n1 Have you had your lunch yet? (Yes/at one o'clock)\n2 Have you had your breakfast yet? (Yes/at seven o'clock)\nB Write sentences using have had or had."
  },
  {
    id: 85,
    title: "Paris in the spring",
    text: "A: Have you ever been to Paris, Ken?\nB: Yes, I have.\nA: When did you go there?\nB: I went there last spring.\nA: What was the weather like?\nB: It was beautiful. The sun shone every day.",
    vocabulary: [
      { word: "Paris", phonetic: "/'pærɪs/", meaning: "n. 巴黎" },
      { word: "cinema", phonetic: "/'sɪnəmə/", meaning: "n. 电影院" },
      { word: "film", phonetic: "/fɪlm/", meaning: "n. 电影" },
      { word: "beautiful", phonetic: "/'bjuːtɪfl/", meaning: "adj. 美丽的" },
      { word: "city", phonetic: "/'sɪti/", meaning: "n. 城市" },
      { word: "never", phonetic: "/'nevə/", meaning: "adv. 从未" },
      { word: "ever", phonetic: "/'evə/", meaning: "adv. 曾经" }
    ]
  },
  {
    id: 86,
    title: "What have you done?",
    vocabulary: [
      { word: "clean", phonetic: "/kliːn/", meaning: "v. 打扫" },
      { word: "wash", phonetic: "/wɒʃ/", meaning: "v. 洗" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: Have you ever been to Paris? (Yes/last year)\nYes, I have. I went there last year.\n1 Have you ever been to London? (Yes/in 1990)\n2 Have you ever been to New York? (Yes/two years ago)\nB Write sentences using have been or went."
  },
  {
    id: 87,
    title: "A car crash",
    text: "A: Is that your car, Ken?\nB: No, it isn't. It's my brother's.\nA: What happened to it?\nB: There was a car crash. My brother was driving it.\nA: Was he hurt?\nB: No, he wasn't. But the car was badly damaged.",
    vocabulary: [
      { word: "attendant", phonetic: "/ə'tendənt/", meaning: "n. 接待员" },
      { word: "bring", phonetic: "/brɪŋ/", meaning: "v. 带来" },
      { word: "garage", phonetic: "/'gærɑːʒ/", meaning: "n. 车库" },
      { word: "crash", phonetic: "/kræʃ/", meaning: "n. 碰撞" },
      { word: "happen", phonetic: "/'hæpən/", meaning: "v. 发生" },
      { word: "damage", phonetic: "/'dæmɪdʒ/", meaning: "v. 损坏" },
      { word: "frighten", phonetic: "/'fraɪtn/", meaning: "v. 使惊恐" }
    ]
  },
  {
    id: 88,
    title: "Have you just...?",
    vocabulary: [
      { word: "bring", phonetic: "/brɪŋ/", meaning: "v. 带来" },
      { word: "buy", phonetic: "/baɪ/", meaning: "v. 买" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: Have you just brought the car? (Yes/ten minutes ago)\nYes, I have. I brought it ten minutes ago.\n1 Have you just bought that book? (Yes/yesterday)\n2 Have you just seen the doctor? (Yes/this morning)\nB Write sentences using have just or the past tense."
  },
  {
    id: 89,
    title: "For sale",
    text: "A: Good morning. I believe that this house is for sale.\nB: That's right.\nA: May I have a look at it, please?\nB: Yes, of course. Come in.\nA: How long have you lived here?\nB: I've lived here for twenty years.\nA: Why do you want to sell it?\nB: Because my husband has just retired.",
    vocabulary: [
      { word: "for sale", phonetic: "/fɔː seɪl/", meaning: "待售" },
      { word: "believe", phonetic: "/bɪ'liːv/", meaning: "v. 相信" },
      { word: "may", phonetic: "/meɪ/", meaning: "modal verb 可以" },
      { word: "how long", phonetic: "/haʊ lɒŋ/", meaning: "多久" },
      { word: "since", phonetic: "/sɪns/", meaning: "prep. 自从" },
      { word: "why", phonetic: "/waɪ/", meaning: "adv. 为什么" },
      { word: "because", phonetic: "/bɪ'kɒz/", meaning: "conj. 因为" },
      { word: "retire", phonetic: "/rɪ'taɪə/", meaning: "v. 退休" }
    ]
  },
  {
    id: 90,
    title: "Have you yet?",
    vocabulary: [
      { word: "live", phonetic: "/lɪv/", meaning: "v. 居住" },
      { word: "work", phonetic: "/wɜːk/", meaning: "v. 工作" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: How long have you lived here? (for twenty years)\nI've lived here for twenty years.\n1 How long have you worked here? (since 1985)\n2 How long have you been in London? (for two weeks)\nB Write sentences using for or since."
  },
  {
    id: 91,
    title: "Poor Ian!",
    text: "A: Has Ian sold his house yet?\nB: Yes, he has. He sold it last week.\nA: Has he bought a new house yet?\nB: No, he hasn't. He's looking for one.\nA: Why does he want to move?\nB: Because his wife doesn't like this district.",
    vocabulary: [
      { word: "still", phonetic: "/stɪl/", meaning: "adv. 还，仍然" },
      { word: "move", phonetic: "/muːv/", meaning: "v. 搬家" },
      { word: "miss", phonetic: "/mɪs/", meaning: "v. 想念，错过" },
      { word: "neighbour", phonetic: "/'neɪbə/", meaning: "n. 邻居" },
      { word: "person", phonetic: "/'pɜːsn/", meaning: "n. 人" },
      { word: "people", phonetic: "/'piːpl/", meaning: "n. 人们" },
      { word: "poor", phonetic: "/pʊə/", meaning: "adj. 可怜的" }
    ]
  },
  {
    id: 92,
    title: "When did it happen?",
    vocabulary: [
      { word: "sell", phonetic: "/sel/", meaning: "v. 卖" },
      { word: "buy", phonetic: "/baɪ/", meaning: "v. 买" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: Has he sold his house yet? (Yes/last week)\nYes, he has. He sold it last week.\n1 Has he bought a new car yet? (Yes/yesterday)\n2 Has she finished her homework yet? (Yes/an hour ago)\nB Write sentences using yet or the past tense."
  },
  {
    id: 93,
    title: "Our new neighbour",
    text: "A: Have you met our new neighbour yet?\nB: No, I haven't.\nA: He's just moved in. His name's Nigel.\nB: Where does he come from?\nA: He comes from Australia.\nB: What's his job?\nA: He's a pilot.",
    vocabulary: [
      { word: "pilot", phonetic: "/'paɪlət/", meaning: "n. 飞行员" },
      { word: "return", phonetic: "/rɪ'tɜːn/", meaning: "v. 回来" },
      { word: "fly", phonetic: "/flaɪ/", meaning: "v. 飞" }
    ]
  },
  {
    id: 94,
    title: "When did you go to...?",
    vocabulary: [
      { word: "Australia", phonetic: "/ɒ'streɪliə/", meaning: "n. 澳大利亚" },
      { word: "pilot", phonetic: "/'paɪlət/", meaning: "n. 飞行员" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: When did you go to Australia? (in 1990)\nI went there in 1990.\n1 When did you go to London? (last year)\n2 When did you go to Paris? (three years ago)\nB Write sentences using the past tense of the verbs."
  },
  {
    id: 95,
    title: "Tickets, please!",
    text: "A: Tickets, please!\nB: Two to London, please.\nA: Single or return?\nB: Return, please.\nA: That's twenty pounds, please.\nB: Here you are.\nA: Thank you. The train's at platform two.",
    vocabulary: [
      { word: "station", phonetic: "/'steɪʃn/", meaning: "n. 车站" },
      { word: "porter", phonetic: "/'pɔːtə/", meaning: "n. 搬运工" },
      { word: "several", phonetic: "/'sevrəl/", meaning: "adj. 几个" },
      { word: "foreign", phonetic: "/'fɒrən/", meaning: "adj. 外国的" },
      { word: "wonder", phonetic: "/'wʌndə/", meaning: "v. 感到奇怪" }
    ]
  },
  {
    id: 96,
    title: "What's the time?",
    vocabulary: [
      { word: "station", phonetic: "/'steɪʃn/", meaning: "n. 车站" },
      { word: "porter", phonetic: "/'pɔːtə/", meaning: "n. 搬运工" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: What's the time? (2:00)\nIt's two o'clock.\n1 What's the time? (3:00)\n2 What's the time? (4:00)\nB Write sentences using the past tense of the verbs."
  },
  {
    id: 97,
    title: "A small blue case",
    text: "A: I've left my case on the train.\nB: What's it like, sir?\nA: It's a small blue case. It has my name on it.\nB: I'll look for it, sir. What's your name, please?\nA: My name's Hall.",
    vocabulary: [
      { word: "leave", phonetic: "/liːv/", meaning: "v. 遗留" },
      { word: "describe", phonetic: "/dɪ'skraɪb/", meaning: "v. 描述" },
      { word: "zip", phonetic: "/zɪp/", meaning: "n. 拉链" },
      { word: "label", phonetic: "/'leɪbl/", meaning: "n. 标签" },
      { word: "handle", phonetic: "/'hændl/", meaning: "n. 提手" },
      { word: "address", phonetic: "/ə'dres/", meaning: "n. 地址" },
      { word: "pence", phonetic: "/pens/", meaning: "n. penny的复数" },
      { word: "belong", phonetic: "/bɪ'lɒŋ/", meaning: "v. 属于" }
    ]
  },
  {
    id: 98,
    title: "Whose is it?",
    vocabulary: [
      { word: "case", phonetic: "/keɪs/", meaning: "n. 箱子" },
      { word: "blue", phonetic: "/bluː/", meaning: "adj. 蓝色的" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: Whose is this case? (It's mine.)\nIt's mine.\n1 Whose is this book? (It's his.)\n2 Whose is this pen? (It's hers.)\nB Write sentences using possessive pronouns."
  },
  {
    id: 99,
    title: "Ow!",
    text: "A: What's the matter, Andy?\nB: I've just slipped and fallen.\nA: Have you hurt yourself?\nB: Yes, I have. I've hurt my leg.\nA: Can you stand up?\nB: No, I can't.",
    vocabulary: [
      { word: "slip", phonetic: "/slɪp/", meaning: "v. 滑倒" },
      { word: "fall", phonetic: "/fɔːl/", meaning: "v. 落下" },
      { word: "hurt", phonetic: "/hɜːt/", meaning: "v. 受伤" },
      { word: "help", phonetic: "/help/", meaning: "v. 帮助" },
      { word: "step", phonetic: "/step/", meaning: "n. 台阶" },
      { word: "stairs", phonetic: "/steəz/", meaning: "n. 楼梯" },
      { word: "knee", phonetic: "/niː/", meaning: "n. 膝盖" },
      { word: "bend", phonetic: "/bend/", meaning: "v. 弯曲" },
      { word: "finger", phonetic: "/'fɪŋgə/", meaning: "n. 手指" }
    ]
  },
  {
    id: 100,
    title: "Which one?",
    vocabulary: [
      { word: "leg", phonetic: "/leg/", meaning: "n. 腿" },
      { word: "arm", phonetic: "/ɑːm/", meaning: "n. 手臂" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: Which leg have you hurt? (the left one)\nI've hurt the left one.\n1 Which arm have you hurt? (the right one)\n2 Which finger have you hurt? (this one)\nB Write sentences using which and one."
  },
  {
    id: 101,
    title: "A card from Jimmy",
    text: "A: Read this card, Penny. It's from Jimmy.\nB: Where is he?\nA: He's in Scotland. He's having a holiday there.\nB: What's he doing?\nA: He's climbing mountains.\nB: Is he enjoying himself?\nA: Yes, he is.",
    vocabulary: [
      { word: "card", phonetic: "/kɑːd/", meaning: "n. 明信片，卡片" },
      { word: "Jimmy", phonetic: "/'dʒɪmi/", meaning: "吉米(人名)" },
      { word: "Scotland", phonetic: "/'skɒtlənd/", meaning: "n. 苏格兰" },
      { word: "holiday", phonetic: "/'hɒlədeɪ/", meaning: "n. 假日" },
      { word: "climb", phonetic: "/klaɪm/", meaning: "v. 攀登" },
      { word: "mountain", phonetic: "/'maʊntɪn/", meaning: "n. 山" },
      { word: "enjoy oneself", phonetic: "/ɪn'dʒɔɪ wʌn'self/", meaning: "过得快活" },
      { word: "myself", phonetic: "/maɪ'self/", meaning: "pron. 我自己" },
      { word: "yourself", phonetic: "/jɔː'self/", meaning: "pron. 你自己" },
      { word: "himself", phonetic: "/hɪm'self/", meaning: "pron. 他自己" },
      { word: "herself", phonetic: "/hɜː'self/", meaning: "pron. 她自己" },
      { word: "itself", phonetic: "/ɪt'self/", meaning: "pron. 它自己" },
      { word: "ourselves", phonetic: "/aʊə'selvz/", meaning: "pron. 我们自己" },
      { word: "yourselves", phonetic: "/jɔː'selvz/", meaning: "pron. 你们自己" },
      { word: "themselves", phonetic: "/ðəm'selvz/", meaning: "pron. 他们自己" }
    ]
  },
  {
    id: 102,
    title: "He says he...",
    vocabulary: [
      { word: "enjoy", phonetic: "/ɪn'dʒɔɪ/", meaning: "v. 欣赏，享受" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: Is he enjoying himself? (Yes)\nYes, he is. He's enjoying himself.\n1 Are they enjoying themselves? (Yes)\n2 Is she enjoying herself? (Yes)\nB Write sentences using reflexive pronouns."
  },
  {
    id: 103,
    title: "The French test",
    text: "A: How was the French test, Gary?\nB: It was very difficult. I couldn't answer all the questions.\nA: Were the questions very hard?\nB: Yes, they were. I hope I've passed.",
    vocabulary: [
      { word: "exam", phonetic: "/ɪg'zæm/", meaning: "n. 考试" },
      { word: "pass", phonetic: "/pɑːs/", meaning: "v. 及格，通过" },
      { word: "mathematics", phonetic: "/ˌmæθə'mætɪks/", meaning: "n. 数学(常简略为maths)" },
      { word: "question", phonetic: "/'kwestʃən/", meaning: "n. 问题" },
      { word: "easy", phonetic: "/'iːzi/", meaning: "adj. 容易的" },
      { word: "enough", phonetic: "/ɪ'nʌf/", meaning: "adv. 足够地" },
      { word: "fail", phonetic: "/feɪl/", meaning: "v. 不及格，失败" },
      { word: "answer", phonetic: "/'ɑːnsə/", meaning: "v. 回答" },
      { word: "mark", phonetic: "/mɑːk/", meaning: "n. 分数" },
      { word: "rest", phonetic: "/rest/", meaning: "n. 其他的东西" },
      { word: "difficult", phonetic: "/'dɪfɪkəlt/", meaning: "adj. 困难的" },
      { word: "hate", phonetic: "/heɪt/", meaning: "v. 讨厌" },
      { word: "low", phonetic: "/ləʊ/", meaning: "adj. 低的" },
      { word: "cheer", phonetic: "/tʃɪə/", meaning: "v. 振作，振奋" },
      { word: "guy", phonetic: "/gaɪ/", meaning: "n. 家伙，人" },
      { word: "top", phonetic: "/tɒp/", meaning: "n. 上方，顶部" }
    ]
  },
  {
    id: 104,
    title: "Too, very, enough",
    vocabulary: [
      { word: "clever", phonetic: "/'klevə/", meaning: "adj. 聪明的" },
      { word: "stupid", phonetic: "/'stjuːpɪd/", meaning: "adj. 笨的" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: Was the test difficult? (Yes/too difficult)\nYes, it was. It was too difficult.\n1 Was the question easy? (Yes/easy enough)\n2 Was the car expensive? (Yes/too expensive)\nB Write sentences using too or enough."
  },
  {
    id: 105,
    title: "Full of mistakes",
    text: "A: Look at this letter, Sandra. It's full of mistakes.\nB: I'm sorry, sir. I'll type it again.\nA: You must be more careful. You've made ten mistakes in one letter.\nB: I'm very sorry, sir.",
    vocabulary: [
      { word: "spell", phonetic: "/spel/", meaning: "v. 拼写" },
      { word: "intelligent", phonetic: "/ɪn'telɪdʒənt/", meaning: "adj. 聪明的，有才智的" },
      { word: "mistake", phonetic: "/mɪ'steɪk/", meaning: "n. 错误" },
      { word: "present", phonetic: "/'preznt/", meaning: "n. 礼物" },
      { word: "dictionary", phonetic: "/'dɪkʃənəri/", meaning: "n. 字典" }
    ]
  },
  {
    id: 106,
    title: "I want you to...",
    vocabulary: [
      { word: "carry", phonetic: "/'kæri/", meaning: "v. 携带，搬运" },
      { word: "correct", phonetic: "/kə'rekt/", meaning: "v. 改正，纠正" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: What do you want me to do? (type this letter)\nI want you to type this letter.\n1 What do you want him to do? (carry this case)\n2 What do you want her to do? (correct these mistakes)\nB Write sentences using want someone to do something."
  },
  {
    id: 107,
    title: "It's too small.",
    text: "A: Do you like this dress, Charlotte?\nB: Yes, I do. But it's too small for me.\nA: Try this one. It's a larger size.\nB: This one's too large. Do you have a smaller one?\nA: I'm sorry. We don't have any more.",
    vocabulary: [
      { word: "assistant", phonetic: "/ə'sɪstənt/", meaning: "n. 店员，助手" },
      { word: "dress", phonetic: "/dres/", meaning: "n. 连衣裙" },
      { word: "suit", phonetic: "/suːt/", meaning: "n. 套装" },
      { word: "size", phonetic: "/saɪz/", meaning: "n. 尺寸，尺码" },
      { word: "large", phonetic: "/lɑːdʒ/", meaning: "adj. 大的" },
      { word: "small", phonetic: "/smɔːl/", meaning: "adj. 小的" },
      { word: "tight", phonetic: "/taɪt/", meaning: "adj. 紧的" },
      { word: "loose", phonetic: "/luːs/", meaning: "adj. 松的" },
      { word: "big", phonetic: "/bɪg/", meaning: "adj. 大的" },
      { word: "little", phonetic: "/'lɪtl/", meaning: "adj. 小的" }
    ]
  },
  {
    id: 108,
    title: "How do they compare?",
    vocabulary: [
      { word: "compare", phonetic: "/kəm'peə/", meaning: "v. 比较" }
    ],
    exercise: "Written exercise 书面练习\nA Write sentences.\nExample: This dress is small. That one is smaller.\nThis dress is small. That one is smaller.\n1 This suit is large. That one is larger.\n2 This hat is big. That one is bigger.\nB Write sentences using the comparative form of adjectives."
  },
  {
    id: 109,
    title: "A good idea",
    text: "A: Shall we have a holiday, Jane?\nB: That's a good idea. Where shall we go?\nA: Let's go to the seaside.\nB: No, let's go to the mountains.",
    vocabulary: [
      { word: "idea", phonetic: "/aɪ'dɪə/", meaning: "n. 主意" },
      { word: "a bit", phonetic: "/ə bɪt/", meaning: "稍微，一点" }
    ]
  },
  {
    id: 110,
    title: "How do they compare?",
    vocabulary: [
      { word: "mountains", phonetic: "/'maʊntɪnz/", meaning: "n. 山脉" }
    ],
    exercise: "Written exercise 书面练习\nA Write sentences.\nExample: The mountains are higher than the seaside.\nThe mountains are higher than the seaside.\n1 The city is noisier than the village.\n2 The country is quieter than the city.\nB Write sentences using the comparative form of adjectives."
  },
  {
    id: 111,
    title: "The most expensive model",
    text: "A: Can I help you, sir?\nB: Yes, I'd like to see that television, please.\nA: Which one? This one?\nB: No, the one next to it. How much is it?\nA: It's our most expensive model. It costs five hundred pounds.",
    vocabulary: [
      { word: "model", phonetic: "/'mɒdl/", meaning: "n. 型号" },
      { word: "expensive", phonetic: "/ɪk'spensɪv/", meaning: "adj. 昂贵的" },
      { word: "cost", phonetic: "/kɒst/", meaning: "v. 花费" },
      { word: "pound", phonetic: "/paʊnd/", meaning: "n. 英镑" },
      { word: "worth", phonetic: "/wɜːθ/", meaning: "adj. 值得的" },
      { word: "deposit", phonetic: "/dɪ'pɒzɪt/", meaning: "n. 预付款" },
      { word: "instalment", phonetic: "/ɪn'stɔːlmənt/", meaning: "n. 分期付款" },
      { word: "price", phonetic: "/praɪs/", meaning: "n. 价格" }
    ]
  },
  {
    id: 112,
    title: "How do they compare?",
    vocabulary: [
      { word: "television", phonetic: "/'telɪvɪʒn/", meaning: "n. 电视" }
    ],
    exercise: "Written exercise 书面练习\nA Write sentences.\nExample: This television is more expensive than that one.\nThis television is more expensive than that one.\n1 This car is more comfortable than that one.\n2 This book is more interesting than that one.\nB Write sentences using the comparative form of adjectives."
  },
  {
    id: 113,
    title: "Small change",
    text: "A: Can you change a ten-pound note, please?\nB: I'm afraid I can't. I haven't any small change.\nA: That's a pity.\nB: Why don't you ask the conductor?",
    vocabulary: [
      { word: "conductor", phonetic: "/kən'dʌktə/", meaning: "n. 售票员" },
      { word: "fare", phonetic: "/feə/", meaning: "n. 车费" },
      { word: "change", phonetic: "/tʃeɪndʒ/", meaning: "n. 零钱" },
      { word: "pity", phonetic: "/'pɪti/", meaning: "n. 遗憾" },
      { word: "except", phonetic: "/ɪk'sept/", meaning: "prep. 除了" }
    ]
  },
  {
    id: 114,
    title: "I've got none.",
    vocabulary: [
      { word: "none", phonetic: "/nʌn/", meaning: "pron. 没有任何东西" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: Have you any money? (No/none)\nNo, I haven't. I've got none.\n1 Have you any small change? (No/none)\n2 Have they any friends? (No/none)\nB Write sentences using none."
  },
  {
    id: 115,
    title: "Knock, knock!",
    text: "A: Is there anyone at home?\nB: I don't think so. I've knocked twice, but no one has answered.\nA: Perhaps they've gone out.\nB: Let's look through the window.",
    vocabulary: [
      { word: "anyone", phonetic: "/'enɪwʌn/", meaning: "pron. 任何人" },
      { word: "knock", phonetic: "/nɒk/", meaning: "v. 敲" },
      { word: "everything", phonetic: "/'evrɪθɪŋ/", meaning: "pron. 一切事物" },
      { word: "quiet", phonetic: "/'kwaɪət/", meaning: "adj. 安静的" },
      { word: "impossible", phonetic: "/ɪm'pɒsəbl/", meaning: "adj. 不可能的" },
      { word: "invite", phonetic: "/ɪn'vaɪt/", meaning: "v. 邀请" },
      { word: "anything", phonetic: "/'enɪθɪŋ/", meaning: "pron. 任何事物" },
      { word: "nothing", phonetic: "/'nʌθɪŋ/", meaning: "pron. 什么也没有" },
      { word: "lemonade", phonetic: "/ˌlemə'neɪd/", meaning: "n. 柠檬水" },
      { word: "joke", phonetic: "/dʒəʊk/", meaning: "n. 玩笑" }
    ]
  },
  {
    id: 116,
    title: "Every, no, any and some",
    vocabulary: [
      { word: "asleep", phonetic: "/ə'sliːp/", meaning: "adj. 睡着的" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: Is there anyone in the room? (No/no one)\nNo, there isn't. There's no one in the room.\n1 Is there anything in the box? (No/nothing)\n2 Is there anyone in the garden? (No/no one)\nB Write sentences using compound pronouns."
  },
  {
    id: 117,
    title: "A pleasant past",
    text: "A: Do you remember your first job, George?\nB: Yes, I do. I worked in a small office in London.\nA: Did you like it?\nB: Yes, I did. I enjoyed it very much.",
    vocabulary: [
      { word: "past", phonetic: "/pɑːst/", meaning: "n. 过去" },
      { word: "handsome", phonetic: "/'hænsəm/", meaning: "adj. 英俊的" },
      { word: "rich", phonetic: "/rɪtʃ/", meaning: "adj. 富有的" },
      { word: "used to", phonetic: "/juːst tuː/", meaning: "过去常常" }
    ]
  },
  {
    id: 118,
    title: "What were you doing?",
    vocabulary: [
      { word: "while", phonetic: "/waɪl/", meaning: "conj. 当……的时候" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: What were you doing? (I/read/a book)\nI was reading a book.\n1 What was she doing? (She/write/a letter)\n2 What were they doing? (They/watch/television)\nB Write sentences using the past continuous tense."
  },
  {
    id: 119,
    title: "A true story",
    text: "A: Is this a true story, George?\nB: Yes, it is.\nA: It happened to a friend of mine, didn't it?\nB: That's right.\nA: It happened last week.\nB: No, it didn't. It happened many years ago.\nA: Where did it happen?\nB: It happened in a small village in France.\nA: What happened?\nB: A thief entered a house at one o'clock in the morning.\nA: Was it dark?\nB: Yes, it was.\nA: Did the thief have a torch?\nB: Yes, he did.\nA: What did he do?\nB: He went into the dining room and opened a drawer.\nA: What did he find?\nB: He found some silver.\nA: Did he hear a voice?\nB: Yes, he did.\nA: What did the voice say?\nB: It said, \"I can see you!\"\nA: Was the thief frightened?\nB: Yes, he was.\nA: Did he drop the silver?\nB: Yes, he did.\nA: Did he run away?\nB: Yes, he did.\nA: Who said, \"I can see you\"?\nB: A parrot!",
    vocabulary: [
      { word: "story", phonetic: "/'stɔːri/", meaning: "n. 故事" },
      { word: "happen", phonetic: "/'hæpən/", meaning: "v. 发生" },
      { word: "thief", phonetic: "/θiːf/", meaning: "n. 贼" },
      { word: "enter", phonetic: "/'entə/", meaning: "v. 进入" },
      { word: "dark", phonetic: "/dɑːk/", meaning: "adj. 黑暗的" },
      { word: "torch", phonetic: "/tɔːtʃ/", meaning: "n. 手电筒" },
      { word: "voice", phonetic: "/vɔɪs/", meaning: "n. 说话声" },
      { word: "parrot", phonetic: "/'pærət/", meaning: "n. 鹦鹉" }
    ]
  },
  {
    id: 120,
    title: "It had already happened.",
    vocabulary: [
      { word: "already", phonetic: "/ɔːl'redi/", meaning: "adv. 已经" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: Had the thief entered the house? (Yes/already)\nYes, he had. He had already entered the house.\n1 Had they finished their dinner? (Yes/already)\n2 Had she left the office? (Yes/already)\nB Write sentences using the past perfect tense."
  },
  {
    id: 121,
    title: "The man in a hat",
    text: "A: Who's that man in the hat?\nB: Which one? The one with the umbrella?\nA: No, the one next to him.\nB: That's Mr. Taylor. He's our new manager.",
    vocabulary: [
      { word: "customer", phonetic: "/'kʌstəmə/", meaning: "n. 顾客" },
      { word: "forget", phonetic: "/fə'get/", meaning: "v. 忘记" },
      { word: "manager", phonetic: "/'mænɪdʒə/", meaning: "n. 经理" },
      { word: "serve", phonetic: "/sɜːv/", meaning: "v. 服务，接待" },
      { word: "counter", phonetic: "/'kaʊntə/", meaning: "n. 柜台" },
      { word: "recognize", phonetic: "/'rekəgnaɪz/", meaning: "v. 认出" }
    ]
  },
  {
    id: 122,
    title: "Who (whom), which and that",
    vocabulary: [
      { word: "road", phonetic: "/rəʊd/", meaning: "n. 路" }
    ],
    exercise: "Written exercise 书面练习\nA Write sentences.\nExample: The man is a manager. He is in the hat.\nThe man who is in the hat is a manager.\n1 The woman is an actress. She is over there.\n2 The car is very fast. It is going at seventy miles an hour.\nB Write sentences using relative pronouns."
  },
  {
    id: 123,
    title: "A trip to Australia",
    chineseTitle: "澳大利亚之行",
    question: "Who is the man with the beard?",
    chineseQuestion: "那个长着络腮胡子的人是谁？",
    text: "MIKE: Look, Scott. This is a photograph I took during my trip to Australia.\nSCOTT: Let me see it, Mike.\nSCOTT: This is a good photograph. Who are these people?\nMIKE: They're people I met during the trip.\nMIKE: That's the ship we travelled on.\nSCOTT: What a beautiful ship!\nSCOTT: Who's this?\nMIKE: That's the man I told you about. Remember?\nSCOTT: Ah yes. The one who offered you a job in Australia.\nMIKE: That's right.\nSCOTT: Who's this?\nMIKE: Guess!\nSCOTT: It's not you, is it?\nMIKE: That's right.\nMIKE: I grew a beard during the trip, but I shaved it off when I came home.\nSCOTT: Why did you shave it off?\nMIKE: My wife didn't like it!",
    audioUrl: "https://raw.githubusercontent.com/SeleneStar/New_concept_English/master/%E8%8B%B1%E9%9F%B3/%E6%96%B0%E6%A6%82%E5%BF%B5%E8%8B%B1%E8%AF%AD%E7%AC%AC1%E5%86%8CMP3(%E8%8B%B1%E9%9F%B3%2BLRC%EF%BC%89/123.mp3",
    vocabulary: [
      { word: "during", phonetic: "/'djʊərɪŋ/", meaning: "prep. 在……期间" },
      { word: "trip", phonetic: "/trɪp/", meaning: "n. 旅行" },
      { word: "offer", phonetic: "/'ɒfə/", meaning: "v. 提供" },
      { word: "job", phonetic: "/dʒɒb/", meaning: "n. 工作" },
      { word: "guess", phonetic: "/ges/", meaning: "v. 猜" },
      { word: "grow", phonetic: "/grəʊ/", meaning: "v. 长，生长" },
      { word: "beard", phonetic: "/bɪəd/", meaning: "n. 胡须" }
    ]
  },
  {
    id: 124,
    title: "(Who) / (whom), (which) and (that)",
    vocabulary: [
      { word: "kitten", phonetic: "/'kɪtn/", meaning: "n. 小猫" }
    ],
    exercise: "Written exercise 书面练习\nA Write sentences.\nExample: The man is Nigel. You met him yesterday.\nThe man (whom) you met yesterday is Nigel.\n1 The book is interesting. I read it last week.\n2 The girl is Penny. You saw her this morning.\nB Write sentences using relative pronouns (optional)."
  },
  {
    id: 125,
    title: "Tea for two",
    text: "A: Can't you come in and have tea now, Susan?\nB: I'm afraid I can't, Mother. I'm having a bath.\nA: What about you, Tom?\nB: I'm having a bath, too.",
    vocabulary: [
      { word: "water", phonetic: "/'wɔːtə/", meaning: "n. 水" },
      { word: "forget", phonetic: "/fə'get/", meaning: "v. 忘记" },
      { word: "rather", phonetic: "/'rɑːðə/", meaning: "adv. 相当" },
      { word: "tea", phonetic: "/tiː/", meaning: "n. 茶" },
      { word: "coffee", phonetic: "/'kɒfi/", meaning: "n. 咖啡" }
    ]
  },
  {
    id: 126,
    title: "Have to and must",
    vocabulary: [
      { word: "must", phonetic: "/mʌst/", meaning: "modal verb 必须" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: Must you go now? (Yes/have to)\nYes, I must. I have to go now.\n1 Must she leave now? (Yes/has to)\n2 Must they wait now? (Yes/have to)\nB Write sentences using have to or must."
  },
  {
    id: 127,
    title: "A famous actress",
    text: "A: Can you recognize that woman, Penny?\nB: No, I can't. Who is she?\nA: That's Liz Taylor. She's a famous actress.\nB: She's very beautiful, isn't she?\nA: Yes, she is. She's won many prizes.",
    vocabulary: [
      { word: "famous", phonetic: "/'feɪməs/", meaning: "adj. 著名的" },
      { word: "actress", phonetic: "/'æktrəs/", meaning: "n. 女演员" },
      { word: "at least", phonetic: "/ət liːst/", meaning: "至少" },
      { word: "actor", phonetic: "/'æktə/", meaning: "n. 男演员" },
      { word: "read", phonetic: "/riːd/", meaning: "v. 读" }
    ]
  },
  {
    id: 128,
    title: "He says that he...",
    vocabulary: [
      { word: "believe", phonetic: "/bɪ'liːv/", meaning: "v. 相信" }
    ],
    exercise: "Written exercise 书面练习\nA Write sentences.\nExample: He is a famous actor. He says...\nHe says that he is a famous actor.\n1 She is a famous actress. She says...\n2 They are very rich. They say...\nB Write sentences using indirect speech."
  },
  {
    id: 129,
    title: "Seventy miles an hour",
    text: "A: Look at that car! It's going very fast.\nB: How fast is it going?\nA: It's going at seventy miles an hour.\nB: That's too fast for this road.",
    vocabulary: [
      { word: "wave", phonetic: "/weɪv/", meaning: "v. 挥手" },
      { word: "track", phonetic: "/træk/", meaning: "n. 跑道" },
      { word: "mile", phonetic: "/maɪl/", meaning: "n. 英里" },
      { word: "overtake", phonetic: "/ˌəʊvə'teɪk/", meaning: "v. 超过" },
      { word: "speed limit", phonetic: "/'spiːd lɪmɪt/", meaning: "速度限制" },
      { word: "dream", phonetic: "/driːm/", meaning: "v. 做梦" },
      { word: "sign", phonetic: "/saɪn/", meaning: "n. 标记，牌子" },
      { word: "driving licence", phonetic: "/'draɪvɪŋ 'laɪsns/", meaning: "驾驶执照" },
      { word: "charge", phonetic: "/tʃɑːdʒ/", meaning: "v. 罚款" },
      { word: "darling", phonetic: "/'dɑːlɪŋ/", meaning: "n. 亲爱的" }
    ]
  },
  {
    id: 130,
    title: "He says that he...",
    vocabulary: [
      { word: "fast", phonetic: "/fɑːst/", meaning: "adj. 快的" }
    ],
    exercise: "Written exercise 书面练习\nA Write sentences.\nExample: He was going very fast. He says...\nHe says that he was going very fast.\n1 She was driving carefully. She says...\n2 They were waiting for a bus. They say...\nB Write sentences using indirect speech (past tense)."
  },
  {
    id: 131,
    title: "Don't be so selfish!",
    text: "A: Is that you, John?\nB: Yes, Mother.\nA: What are you doing?\nB: I'm eating some chocolate.\nA: Don't eat it all. Give some to your sister.\nB: I've already given her some.\nA: Don't be so selfish!",
    vocabulary: [
      { word: "Egypt", phonetic: "/'iːdʒɪpt/", meaning: "n. 埃及" },
      { word: "abroad", phonetic: "/ə'brɔːd/", meaning: "adv. 国外" },
      { word: "worry", phonetic: "/'wʌri/", meaning: "v. 担忧" },
      { word: "selfish", phonetic: "/'selfɪʃ/", meaning: "adj. 自私的" }
    ]
  },
  {
    id: 132,
    title: "He tells me to...",
    vocabulary: [
      { word: "wait", phonetic: "/weɪt/", meaning: "v. 等待" }
    ],
    exercise: "Written exercise 书面练习\nA Write sentences.\nExample: Don't eat it all! (He tells me...)\nHe tells me not to eat it all.\n1 Don't be so selfish! (He tells me...)\n2 Don't wait for me! (He tells me...)\nB Write sentences using indirect commands."
  },
  {
    id: 133,
    title: "Sensational news!",
    text: "A: Have you heard the news?\nB: No, what is it?\nA: Karen's going to get married.\nB: Who's she going to marry?\nA: She's going to marry a man she met in France.",
    vocabulary: [
      { word: "reporter", phonetic: "/rɪ'pɔːtə/", meaning: "n. 记者" },
      { word: "sensible", phonetic: "/'sensəbl/", meaning: "adj. 明智的，合理的" },
      { word: "usual", phonetic: "/'juːʒʊəl/", meaning: "adj. 通常的" },
      { word: "at the moment", phonetic: "/ət ðə 'məʊmənt/", meaning: "此刻，目前" }
    ]
  },
  {
    id: 134,
    title: "He tells me that...",
    vocabulary: [
      { word: "wear", phonetic: "/weə/", meaning: "v. 穿着" }
    ],
    exercise: "Written exercise 书面练习\nA Write sentences.\nExample: I'm going to a party. (She tells me...)\nShe tells me that she is going to a party.\n1 I've grown. (She tells me...)\n2 I haven't anything to wear. (She tells me...)\nB Write sentences using indirect speech."
  },
  {
    id: 135,
    title: "The latest report",
    text: "A: Have you seen the latest report?\nB: No. What is it?\nA: There's been a big fire in the city.\nB: Was anyone hurt?\nA: No, but many people have lost their homes.",
    vocabulary: [
      { word: "future", phonetic: "/'fjuːtʃə/", meaning: "n. 未来" },
      { word: "get married", phonetic: "/get 'mærid/", meaning: "结婚" },
      { word: "hotel", phonetic: "/həʊ'tel/", meaning: "n. 饭店" },
      { word: "latest", phonetic: "/'leɪtɪst/", meaning: "adj. 最近的" },
      { word: "report", phonetic: "/rɪ'pɔːt/", meaning: "n. 报告" },
      { word: "fire", phonetic: "/'faɪə/", meaning: "n. 火灾" }
    ]
  },
  {
    id: 136,
    title: "He said that he...",
    vocabulary: [
      { word: "marry", phonetic: "/'mæri/", meaning: "v. 结婚" }
    ],
    exercise: "Written exercise 书面练习\nA Write sentences.\nExample: I'm going to get married. (He said...)\nHe said that he was going to get married.\n1 I've heard the latest report. (He said...)\n2 Many people have lost their homes. (He said...)\nB Write sentences using indirect speech (past tense)."
  },
  {
    id: 137,
    title: "A pleasant dream",
    text: "A: I had a pleasant dream last night, Jane.\nB: What did you dream about?\nA: I dreamed that I was a millionaire.\nB: What would you do if you were a millionaire?\nA: I'd buy a big house and a fast car.",
    vocabulary: [
      { word: "dream", phonetic: "/driːm/", meaning: "n. 梦" },
      { word: "if", phonetic: "/ɪf/", meaning: "conj. 如果" },
      { word: "millionaire", phonetic: "/ˌmɪljə'neə/", meaning: "n. 百万富翁" }
    ]
  },
  {
    id: 138,
    title: "If...",
    vocabulary: [
      { word: "win", phonetic: "/wɪn/", meaning: "v. 赢" }
    ],
    exercise: "Written exercise 书面练习\nA Write sentences.\nExample: If I were a millionaire, I'd buy a big house.\nIf I were a millionaire, I'd buy a big house.\n1 If I won the lottery, I'd travel round the world.\n2 If I had enough money, I'd buy a new car.\nB Write sentences using the second conditional."
  },
  {
    id: 139,
    title: "Is that you, John?",
    text: "A: Is that you, John?\nB: Yes, it is.\nA: I've been trying to telephone you all morning.\nB: I'm sorry. I've been out.",
    vocabulary: [
      { word: "extra", phonetic: "/'ekstrə/", meaning: "adj. 额外的" },
      { word: "engineer", phonetic: "/ˌendʒɪ'nɪə/", meaning: "n. 工程师" },
      { word: "overseas", phonetic: "/ˌəʊvə'siːz/", meaning: "adv. 海外" },
      { word: "believe", phonetic: "/bɪ'liːv/", meaning: "v. 相信" }
    ]
  },
  {
    id: 140,
    title: "He said that he...",
    vocabulary: [
      { word: "telephone", phonetic: "/'telɪfəʊn/", meaning: "v. 打电话" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: I've been trying to telephone you. (He said...)\nHe said that he had been trying to telephone me.\n1 I've been out. (He said...)\n2 I've been working hard. (He said...)\nB Write sentences using indirect speech (past perfect continuous)."
  },
  {
    id: 141,
    title: "Sally's first train ride",
    text: "A: How did Sally like her first train ride?\nB: She enjoyed it very much.\nA: Was she frightened?\nB: No, she wasn't. She sat by the window and looked at the view.",
    vocabulary: [
      { word: "excited", phonetic: "/ɪk'saɪtɪd/", meaning: "adj. 兴奋的" },
      { word: "middle-aged", phonetic: "/'mɪdl 'eɪdʒd/", meaning: "中年的" },
      { word: "opposite", phonetic: "/'ɒpəzɪt/", meaning: "prep. 在……对面" },
      { word: "curiously", phonetic: "/'kjʊərɪəsli/", meaning: "adv. 好奇地" },
      { word: "funny", phonetic: "/'fʌni/", meaning: "adj. 滑稽的，可笑的" },
      { word: "powder", phonetic: "/'paʊdə/", meaning: "n. 粉末" },
      { word: "compact", phonetic: "/'kɒmpækt/", meaning: "n. 带镜的粉盒" },
      { word: "kindly", phonetic: "/'kaɪndli/", meaning: "adv. 和蔼地" },
      { word: "ugly", phonetic: "/'ʌgli/", meaning: "adj. 丑陋的" },
      { word: "amused", phonetic: "/ə'mjuːzd/", meaning: "adj. 客气的，被逗乐的" }
    ]
  },
  {
    id: 142,
    title: "Someone, anything, everywhere, nowhere",
    vocabulary: [
      { word: "everywhere", phonetic: "/'evrɪweə/", meaning: "adv. 到处" }
    ],
    exercise: "Written exercise 书面练习\nA Write questions and answers.\nExample: Is there anyone in the room? (No/no one)\nNo, there isn't. There's no one in the room.\n1 Is there anything in the box? (No/nothing)\n2 Is there anyone in the garden? (No/no one)\nB Write sentences using compound pronouns."
  },
  {
    id: 143,
    title: "A walk through the woods",
    text: "A: Did you have a nice walk, Penny?\nB: Yes, thank you. We walked through the woods.\nA: Did you see any animals?\nB: No, we didn't. But we saw some beautiful flowers.",
    vocabulary: [
      { word: "woods", phonetic: "/wʊdz/", meaning: "n. 树林" },
      { word: "bridge", phonetic: "/brɪdʒ/", meaning: "n. 桥" },
      { word: "across", phonetic: "/ə'krɒs/", meaning: "prep. 横过" },
      { word: "entrance", phonetic: "/'entrəns/", meaning: "入口" },
      { word: "exit", phonetic: "/'eksɪt/", meaning: "出口" },
      { word: "dead end", phonetic: "/ded end/", meaning: "死胡同" },
      { word: "sign", phonetic: "/saɪn/", meaning: "n. 标记，牌子" }
    ]
  },
  {
    id: 144,
    title: "He said that he...",
    vocabulary: [
      { word: "walk", phonetic: "/wɔːk/", meaning: "v. 走路" }
    ],
    exercise: "Written exercise 书面练习\nA Write sentences.\nExample: We walked through the woods. (He said...)\nHe said that they had walked through the woods.\n1 We saw some beautiful flowers. (He said...)\n2 We didn't see any animals. (He said...)\nB Write sentences using indirect speech (past perfect)."
  }
];
