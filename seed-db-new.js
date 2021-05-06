const Db = require('./db');
const defaultDb = new Db();
const fs = require('fs');

var swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

var shuffleDeck = function (deck) {
  deck = deck.slice(); // don't want to mutate the input deck.
  for (let i = 0; i < deck.length; i++) {
    let j = i + Math.floor(Math.random() * (deck.length - i));
    swap(deck, i, j);
  }

  return deck;
};

var pickRandom = function (list) {
  return list[Math.floor(Math.random() * list.length)];
};

var productAdjective = function (useAdverb = true) {
  var adjectives = ['lousy', 'great', 'fun', 'stellar', 'terrible', 'ugly', 'beautiful', 'unappealing', 'sturdy', 'clean', 'lovely', 'stunning',
    'good', 'dreamy', 'weird', 'cool', 'decent', 'kitschy', 'fabulous', 'small', 'large', 'cheap', 'fancy', 'fragile', 'icky', 'gross', 'lame'];
  var adverbs = ['pretty', 'really', 'super', 'incredibly', 'utterly', 'somewhat', 'kinda', 'amazingly', 'very', 'kind of', 'absolutely'];

  var adverbRoll = Math.random();
  if (useAdverb && adverbRoll > 0.63484) {
    return `${pickRandom(adverbs)} ${productAdjective(adverbRoll > 0.91784)}`;
  } else {
    return pickRandom(adjectives);
  }
};

var productNoun = function (useDescription = true) {
  var nouns = ['product', 'item', 'thing', 'gift', 'object', 'doohickey', 'gizmo', 'product', 'item', 'product', 'item', 'product', 'item', 'product', 'item',
    'piece', 'thing'];
  var fors = ['kitchen', 'bathroom', 'bedroom', 'yard', 'husband', 'wife', 'son', 'daughter', 'girlfriend', 'boyfriend', 'sister', 'brother', 'aunt', 'uncle', 'dog', 'cat', 'pet',
    'house', 'apartment', 'condo', 'living room', 'den', 'basement', 'attic', 'job', 'office', 'home office', 'home', 'floor', 'wall', 'coworker', 'fiance', 'dad', 'mom', 'grandma', 'grandpa'];
  var forRoll = Math.random();
  if (useDescription && forRoll > 0.7) {
    return `${productNoun(false)} for my ${pickRandom(fors)}`;
  } else {
    return pickRandom(nouns);
  }
};

var opinion = function (title) {
  var iVerbs = ['think', 'found out', 'would say', 'have to tell you', 'see'];
  var itVerbs = ['is', 'is', 'is', 'is', 'is', 'seems like', 'turns out to be', 'really is', 'was', 'has to be'];
  var didVerbs = ['ate', 'lost', 'love', 'hate', 'like', 'don\'t like', 'can\'t stand', 'don\'t understand'];
  var opinion = `I ${pickRandom(iVerbs)} that it ${pickRandom(itVerbs)} a${'aeiou'.includes(title[0]) ? 'n' : ''} ${title}`;
  var didRoll = Math.random();
  if (didRoll > 0.6) {
    return `${opinion}. I ${pickRandom(didVerbs)} it!`;
  } else {
    return opinion;
  }
};

var randomLetter = function () {
  var letters = 'aaaaaaaarrrrrrrrsssssssstttttttteeeeeeennnnnndddddiiiiillllloooooggggkkkmmmhhffvvååjycxz';
  var letters = letters.split('');
  return pickRandom(letters);
};

var randomName = function () {
  var digraphs = ['AB', 'BS', 'SO', 'OR', 'RB', 'AD', 'DM', 'ME', 'ET', 'TE', 'AG', 'GA', 'AM', 'GE', 'EN', 'GN', 'NA', 'AR', 'RY', 'YD', 'NE', 'AI', 'IN', 'AK', 'KS', 'SD', 'DA', 'AL', 'KU', 'UR', 'RU', 'UM', 'UT', 'LA', 'RM', 'LE', 'EX', 'LG', 'LK', 'KA', 'LI', 'IS', 'SK', 'LL', 'MÅ', 'ÅL', 'LS', 'SA', 'RP', 'SE', 'ED', 'ST', 'ER', 'SV', 'VI', 'IK', 'LV', 'VE', 'LÄ', 'ÄN', 'NG', 'MA', 'IA', 'MO', 'ON', 'RF', 'AN', 'ND', 'DR', 'RE', 'EA', 'UP', 'DY', 'EB', 'BO', 'OD', 'EM', 'NI', 'IT', 'TA', 'NJ', 'JA', 'NN', 'OA', 'RS', 'NO', 'NS', 'RD', 'DN', 'NR', 'RI', 'SL', 'LU', 'SS', 'SI', 'NT', 'TI', 'IF', 'FO', 'IL', 'LO', 'OP', 'TO', 'IU', 'US', 'AP', 'PA', 'PE', 'EL', 'KÄ', 'ÄR', 'RH', 'HO', 'OL', 'LM', 'LD', 'RR', 'RA', 'RV', 'AS', 'KE', 'SP', 'EK', 'KT', 'UN', 'PU', 'UD', 'DD', 'DE', 'PV', 'TR', 'AT', 'TN', 'TT', 'ES', 'TY', 'AU', 'UK', 'KR', 'BA', 'GG', 'GI', 'RN', 'IG', 'RO', 'OM', 'BE', 'DI', 'EH', 'HA', 'DL', 'HÖ', 'ÖV', 'VD', 'KV', 'VÄ', 'ÄM', 'MI', 'RG', 'GS', 'SB', 'NH', 'RT', 'TB', 'BY', 'YL', 'RÄ', 'ÄT', 'RÖ', 'ÖM', 'KÅ', 'ÅD', 'TÅ', 'EV', 'VA', 'BI', 'IB', 'BB', 'RÅ', 'GU', 'LY', 'BJ', 'JU', 'ÖN', 'JÄ', 'NU', 'JÖ', 'ÖR', 'RK', 'EF', 'FA', 'BL', 'DH', 'HU', 'UL', 'LT', 'NK', 'EC', 'CK', 'IM', 'MP', 'IX', 'XT', 'OC', 'MM', 'MS', 'MÖ', 'OS', 'LÅ', 'ÅS', 'IP', 'PP', 'SJ', 'OH', 'ID', 'LÖ', 'MU', 'OÅ', 'BR', 'NÄ', 'ÄS', 'AV', 'VU', 'DS', 'YR', 'YN', 'ÄD', 'BU', 'YG', 'YH', 'BÅ', 'ÅG', 'GV', 'ÅV', 'BÄ', 'BÖ', 'ÖJ', 'ÖL', 'SN', 'RJ', 'JE', 'CA', 'YP', 'PS', 'PI', 'CE', 'CI', 'CH', 'IR', 'CL', 'CY', 'AC', 'LF', 'FR', 'EG', 'IO', 'IV', 'DJ', 'DO', 'OF', 'FT', 'OK', 'GO', 'GÖ', 'YC', 'KJ', 'JO', 'ÄL', 'DU', 'DV', 'DÅ', 'ÅT', 'DÄ', 'DG', 'FF', 'FE', 'GB', 'EI', 'KB', 'KO', 'GÅ', 'SF', 'FJ', 'MB', 'NV', 'EP', 'PO', 'RL', 'XK', 'KL', 'VT', 'XP', 'MN', 'AH', 'VO', 'EJ', 'JK', 'IC', 'FI', 'TU', 'GJ', 'NL', 'KÖ', 'XA', 'FL', 'NÖ', 'VÅ', 'YT', 'ÅR', 'ÄC', 'KI', 'FN', 'SY', 'SÅ', 'OT', 'MT', 'YK', 'ÄJ', 'FU', 'UG', 'FY', 'FÅ', 'ÅB', 'ÅN', 'FÄ', 'GL', 'GR', 'FÖ', 'UF', 'EÅ', 'LB', 'SH', 'OB', 'ÖD', 'NÅ', 'VY', 'VB', 'ML', 'OG', 'GY', 'DT', 'YB', 'LH', 'SG', 'GÄ', 'UA', 'HE', 'MD', 'SU', 'HJ', 'TD', 'UV', 'OJ', 'JT', 'OO', 'OV', 'VS', 'TÖ', 'SÖ', 'HY', 'HÅ', 'HÄ', 'ÄG', 'TV', 'EZ', 'NF', 'TS', 'VN', 'JI', 'KK', 'KM', 'UB', 'LR', 'JY', 'ÖK', 'AF', 'AJ', 'JS', 'MF', 'MR', 'AX', 'XI', 'ÄK', 'ÄP', 'KN', 'NY', 'ÖS', 'DB', 'LJ', 'PL', 'NC', 'YS', 'KY', 'GT', 'ÖG', 'XE', 'YM', 'KP', 'ÅK', 'VL', 'ÖY', 'KH', 'YF', 'JB', 'JV', 'OU', 'IE', 'EU', 'AE', 'MJ', 'LN', 'MY', 'TL', 'MÄ', 'JL', 'TJ', 'PT', 'ÖT', 'OX', 'XS', 'PJ', 'OÄ', 'PR', 'TF', 'IÄ', 'PY', 'PÅ', 'PÄ', 'MV', 'XB', 'SC', 'TG', 'ÅÅ', 'ÄF', 'NB', 'XÅ', 'DP', 'TH', 'SM', 'ÖA', 'ÖF', 'PÖ', 'TÄ', 'SÄ', 'ÄV', 'JM', 'HI', 'LP', 'TM', 'VR', 'GH', 'ÄX', 'WI', 'ZI', 'MH', 'ÖP'];
  var fragments = ['SOR', 'AGA', 'GEN', 'YD', 'KS', 'ALA', 'LAR', 'EX', 'LG', 'LK', 'KAL', 'LIS', 'ALL', 'MÅ', 'ÅL', 'ALS', 'ARP', 'EDA', 'LST', 'STER', 'SVI', 'LV', 'VIN', 'INE', 'MAL', 'LIA', 'EA', 'UP', 'EB', 'ITA', 'NJ', 'ANN', 'NNA', 'ORD', 'ANS', 'FO', 'ANT', 'OP', 'IU', 'AP', 'KÄ', 'SKÄ', 'KÄR', 'SKÄR', 'HOL', 'HOLM', 'ARI', 'RIL', 'ILD', 'RAK', 'RV', 'INN', 'KER', 'EKT', 'LUN', 'UDD', 'DEN', 'STR', 'TRA', 'ATT', 'TY', 'UK', 'KRA', 'GIS', 'BAR', 'AREN', 'TAN', 'ATI', 'TIS', 'INGE', 'ELL', 'LLI', 'LLIN', 'LLING', 'MIN', 'GS', 'SB', 'ERG', 'BERG', 'RIT', 'HAR', 'ERT', 'TB', 'RTI', 'YL', 'YLL', 'TTA', 'ÖM', 'EV', 'VAR', 'IB', 'BB', 'GU', 'BIL', 'LSTA', 'TIG', 'BJ', 'RST', 'RÖN', 'NU', 'ÄRN', 'JÖR', 'RKE', 'LME', 'OLME', 'LMEN', 'OLMEN', 'BLA', 'LAD', 'HUL', 'ULT', 'HULT', 'NDA', 'LAND', 'NK', 'SKA', 'CKA', 'BLO', 'MMA', 'MÖ', 'OSS', 'NDE', 'LÅ', 'IP', 'IPP', 'PPA', 'SJ', 'SJÖ', 'OLI', 'IDE', 'MU', 'DIS', 'ORR', 'SSE', 'BRA', 'NÄS', 'VER', 'RED', 'YR', 'RUN', 'YN', 'BU', 'MER', 'ANG', 'YG', 'GEL', 'GGA', 'LEN', 'ÅG', 'BÄ', 'STI', 'PS', 'PI', 'AC', 'ACK', 'CKE', 'SEL', 'EG', 'GER', 'NES', 'ELI', 'IKA', 'NER', 'IO', 'SKR', 'ITT', 'VIS', 'DO', 'OF', 'FT', 'DRA', 'YC', 'YCK', 'ÄL', 'ÄLL', 'DU', 'VAL', 'TID', 'FF', 'FE', 'EI', 'KAR', 'KOR', 'ORP', 'TORP', 'FJ', 'FJO', 'JOR', 'FJOR', 'JORD', 'FJORD', 'NGA', 'ENS', 'PO', 'ERS', 'LER', 'NST', 'ART', 'EJ', 'KÖ', 'NÖ', 'FLO', 'VÅ', 'YT', 'YTT', 'ÅR', 'ÄC', 'ÄCK', 'LÄT', 'NNE', 'OT', 'RAM', 'UG', 'LLE', 'ÅN', 'NGS', 'GRI', 'LB', 'OB', 'SIG', 'GRA', 'TAD', 'STAD', 'OG', 'ROL', 'TAL', 'SAM', 'RES', 'DDA', 'HEM', 'MAN', 'UV', 'OJ', 'OV', 'VS', 'TV', 'TS', 'JON', 'ILA', 'SUN', 'AJ', 'KLA', 'KN', 'ÖS', 'KVI', 'YS', 'PLA', 'LIL', 'LILL', 'LJU', 'ARK', 'TRI', 'MY', 'RIN', 'TJ', 'SM', 'STO', 'AB', 'AB', 'SO', 'SO', 'RB', 'RB', 'GN', 'GN', 'RY', 'RY', 'KU', 'KU', 'UT', 'UT', 'RM', 'RM', 'ISK', 'ISK', 'LLA', 'LLA', 'RP', 'RP', 'SV', 'SV', 'LÄ', 'LÄ', 'ÄN', 'ÄN', 'IA', 'IA', 'OD', 'OD', 'NOR', 'NOR', 'RIK', 'RIK', 'OLM', 'OLM', 'RR', 'RR', 'SP', 'SP', 'UND', 'UND', 'UD', 'UD', 'AST', 'AST', 'TTE', 'TTE', 'GG', 'GG', 'GI', 'GI', 'ARE', 'ARE', 'REN', 'REN', 'IST', 'IST', 'NGE', 'NGE', 'KV', 'KV', 'VÄ', 'VÄ', 'LING', 'LING', 'RG', 'RG', 'BER', 'BER', 'ÄT', 'ÄT', 'ÄTT', 'ÄTT', 'LY', 'LY', 'ÖN', 'ÖN', 'JÄ', 'JÄ', 'KEN', 'KEN', 'MEN', 'MEN', 'HU', 'HU', 'LT', 'LT', 'LAN', 'LAN', 'MP', 'MP', 'MM', 'MM', 'MS', 'MS', 'ÅS', 'ÅS', 'LÖ', 'LÖ', 'ULL', 'ULL', 'BR', 'BR', 'NÄ', 'NÄ', 'ÄS', 'ÄS', 'RAN', 'RAN', 'AV', 'AV', 'ERA', 'ERA', 'JE', 'JE', 'IR', 'IR', 'FR', 'FR', 'IV', 'IV', 'OK', 'OK', 'GO', 'GO', 'MAR', 'MAR', 'TOR', 'TOR', 'RL', 'RL', 'TU', 'TU', 'TEN', 'TEN', 'KI', 'KI', 'SU', 'SU', 'IND', 'IND', 'LJ', 'LJ', 'PL', 'PL', 'TRO', 'TRO', 'PR', 'PR', 'AD', 'AD', 'AD', 'AG', 'AG', 'AG', 'AK', 'AK', 'AK', 'DAL', 'DAL', 'DAL', 'UR', 'UR', 'UR', 'X', 'X', 'X', 'STE', 'STE', 'STE', 'TER', 'TER', 'TER', 'MO', 'MO', 'MO', 'DR', 'DR', 'DR', 'AND', 'AND', 'AND', 'EM', 'EM', 'EM', 'JA', 'JA', 'JA', 'RD', 'RD', 'RD', 'SL', 'SL', 'SL', 'NT', 'NT', 'NT', 'PE', 'PE', 'PE', 'HO', 'HO', 'HO', 'LM', 'LM', 'LM', 'LD', 'LD', 'LD', 'EK', 'EK', 'EK', 'KT', 'KT', 'KT', 'DD', 'DD', 'DD', 'KR', 'KR', 'KR', 'RN', 'RN', 'RN', 'LIG', 'LIG', 'LIG', 'OM', 'OM', 'OM', 'HA', 'HA', 'HA', 'LIN', 'LIN', 'LIN', 'MI', 'MI', 'MI', 'RÄ', 'RÄ', 'RÄ', 'RÖ', 'RÖ', 'RÖ', 'BI', 'BI', 'BI', 'ILL', 'ILL', 'ILL', 'JU', 'JU', 'JU', 'JÖ', 'JÖ', 'JÖ', 'RK', 'RK', 'RK', 'FA', 'FA', 'FA', 'BL', 'BL', 'BL', 'IM', 'IM', 'IM', 'OS', 'OS', 'OS', 'PP', 'PP', 'PP', 'SN', 'SN', 'SN', 'JO', 'JO', 'JO', 'KL', 'KL', 'KL', 'FI', 'FI', 'FI', 'GL', 'GL', 'GL', 'HE', 'HE', 'HE', 'UM', 'UM', 'UM', 'UM', 'SE', 'SE', 'SE', 'SE', 'ED', 'ED', 'ED', 'ED', 'VIK', 'VIK', 'VIK', 'VIK', 'VE', 'VE', 'VE', 'VE', 'NN', 'NN', 'NN', 'NN', 'RS', 'RS', 'RS', 'RS', 'NO', 'NO', 'NO', 'NO', 'NS', 'NS', 'NS', 'NS', 'LU', 'LU', 'LU', 'LU', 'SS', 'SS', 'SS', 'SS', 'SI', 'SI', 'SI', 'SI', 'US', 'US', 'US', 'US', 'BA', 'BA', 'BA', 'BA', 'DI', 'DI', 'DI', 'DI', 'ING', 'ING', 'ING', 'ING', 'RT', 'RT', 'RT', 'RT', 'ÖR', 'ÖR', 'ÖR', 'ÖR', 'ID', 'ID', 'ID', 'ID', 'KO', 'KO', 'KO', 'KO', 'FL', 'FL', 'FL', 'FL', 'ME', 'ME', 'ME', 'ME', 'ME', 'ET', 'ET', 'ET', 'ET', 'ET', 'GA', 'GA', 'GA', 'GA', 'GA', 'GE', 'GE', 'GE', 'GE', 'GE', 'RU', 'RU', 'RU', 'RU', 'RU', 'LS', 'LS', 'LS', 'LS', 'LS', 'ON', 'ON', 'ON', 'ON', 'ON', 'NI', 'NI', 'NI', 'NI', 'NI', 'IT', 'IT', 'IT', 'IT', 'IT', 'LO', 'LO', 'LO', 'LO', 'LO', 'TO', 'TO', 'TO', 'TO', 'TO', 'PA', 'PA', 'PA', 'PA', 'PA', 'KE', 'KE', 'KE', 'KE', 'KE', 'UN', 'UN', 'UN', 'UN', 'UN', 'ES', 'ES', 'ES', 'ES', 'ES', 'STA', 'STA', 'STA', 'STA', 'STA', 'BE', 'BE', 'BE', 'BE', 'BE', 'BY', 'BY', 'BY', 'BY', 'BY', 'UL', 'UL', 'UL', 'UL', 'UL', 'CK', 'CK', 'CK', 'CK', 'CK', 'GR', 'GR', 'GR', 'GR', 'GR', 'AM', 'AM', 'AM', 'AM', 'AM', 'AM', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NE', 'NE', 'NE', 'NE', 'NE', 'NE', 'BO', 'BO', 'BO', 'BO', 'BO', 'BO', 'ÄR', 'ÄR', 'ÄR', 'ÄR', 'ÄR', 'ÄR', 'AS', 'AS', 'AS', 'AS', 'AS', 'AS', 'AT', 'AT', 'AT', 'AT', 'AT', 'AT', 'RO', 'RO', 'RO', 'RO', 'RO', 'RO', 'VA', 'VA', 'VA', 'VA', 'VA', 'VA', 'LE', 'LE', 'LE', 'LE', 'LE', 'LE', 'LE', 'SA', 'SA', 'SA', 'SA', 'SA', 'SA', 'SA', 'DE', 'DE', 'DE', 'DE', 'DE', 'DE', 'DE', 'TR', 'TR', 'TR', 'TR', 'TR', 'TR', 'TR', 'SK', 'SK', 'SK', 'SK', 'SK', 'SK', 'SK', 'SK', 'IK', 'IK', 'IK', 'IK', 'IK', 'IK', 'IK', 'IK', 'TI', 'TI', 'TI', 'TI', 'TI', 'TI', 'TI', 'TI', 'IL', 'IL', 'IL', 'IL', 'IL', 'IL', 'IL', 'IL', 'EL', 'EL', 'EL', 'EL', 'EL', 'EL', 'EL', 'EL', 'OL', 'OL', 'OL', 'OL', 'OL', 'OL', 'OL', 'OL', 'TT', 'TT', 'TT', 'TT', 'TT', 'TT', 'TT', 'TT', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'DA', 'DA', 'DA', 'DA', 'DA', 'DA', 'DA', 'DA', 'DA', 'IS', 'IS', 'IS', 'IS', 'IS', 'IS', 'IS', 'IS', 'IS', 'NG', 'NG', 'NG', 'NG', 'NG', 'NG', 'NG', 'NG', 'NG', 'MA', 'MA', 'MA', 'MA', 'MA', 'MA', 'MA', 'MA', 'MA', 'ND', 'ND', 'ND', 'ND', 'ND', 'ND', 'ND', 'ND', 'ND', 'TE', 'TE', 'TE', 'TE', 'TE', 'TE', 'TE', 'TE', 'TE', 'TE', 'VI', 'VI', 'VI', 'VI', 'VI', 'VI', 'VI', 'VI', 'VI', 'VI', 'RE', 'RE', 'RE', 'RE', 'RE', 'RE', 'RE', 'RE', 'RE', 'RE', 'RI', 'RI', 'RI', 'RI', 'RI', 'RI', 'RI', 'RI', 'RI', 'RI', 'IG', 'IG', 'IG', 'IG', 'IG', 'IG', 'IG', 'IG', 'IG', 'IG', 'KA', 'KA', 'KA', 'KA', 'KA', 'KA', 'KA', 'KA', 'KA', 'KA', 'KA', 'LL', 'LL', 'LL', 'LL', 'LL', 'LL', 'LL', 'LL', 'LL', 'LL', 'LL', 'LL', 'Å', 'Å', 'Å', 'Å', 'Å', 'Å', 'Å', 'Å', 'Å', 'Å', 'Å', 'Å', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'OR', 'IN', 'IN', 'IN', 'IN', 'IN', 'IN', 'IN', 'IN', 'IN', 'IN', 'IN', 'IN', 'IN', 'IN', 'LA', 'LA', 'LA', 'LA', 'LA', 'LA', 'LA', 'LA', 'LA', 'LA', 'LA', 'LA', 'LA', 'LA', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'AL', 'LI', 'LI', 'LI', 'LI', 'LI', 'LI', 'LI', 'LI', 'LI', 'LI', 'LI', 'LI', 'LI', 'LI', 'LI', 'TA', 'TA', 'TA', 'TA', 'TA', 'TA', 'TA', 'TA', 'TA', 'TA', 'TA', 'TA', 'TA', 'TA', 'TA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'RA', 'AR', 'AR', 'AR', 'AR', 'AR', 'AR', 'AR', 'AR', 'AR', 'AR', 'AR', 'AR', 'AR', 'AR', 'AR', 'AR', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'Ö', 'Ö', 'Ö', 'Ö', 'Ö', 'Ö', 'Ö', 'Ö', 'Ö', 'Ö', 'Ö', 'Ö', 'Ö', 'Ö', 'Ö', 'Ö', 'Ö', 'EN', 'EN', 'EN', 'EN', 'EN', 'EN', 'EN', 'EN', 'EN', 'EN', 'EN', 'EN', 'EN', 'EN', 'EN', 'EN', 'EN', 'EN', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'ST', 'ST', 'ST', 'ST', 'ST', 'ST', 'ST', 'ST', 'ST', 'ST', 'ST', 'ST', 'ST', 'ST', 'ST', 'ST', 'ST', 'ST', 'AN', 'AN', 'AN', 'AN', 'AN', 'AN', 'AN', 'AN', 'AN', 'AN', 'AN', 'AN', 'AN', 'AN', 'AN', 'AN', 'AN', 'AN', 'ER', 'ER', 'ER', 'ER', 'ER', 'ER', 'ER', 'ER', 'ER', 'ER', 'ER', 'ER', 'ER', 'ER', 'ER', 'ER', 'ER', 'ER', 'ER', 'Ä', 'Ä', 'Ä', 'Ä', 'Ä', 'Ä', 'Ä', 'Ä', 'Ä', 'Ä', 'Ä', 'Ä', 'Ä', 'Ä', 'Ä', 'Ä', 'Ä', 'Ä', 'Ä', 'Ä', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'];
  var fragmentCount = Math.random() * 9 + 5;
  var name = '';
  for (var i = 0; i < fragmentCount; i++) {
    name += pickRandom(fragments);
  }

  name = `${randomLetter().toLocaleUpperCase()}${name.toLocaleLowerCase()}`;
  for (var i = 0; i < name.length - 1; i++) {
    if (!digraphs.includes(name.slice(i, i + 2).toLocaleUpperCase())) {
      name = `${name.slice(0, i + 1)} ${name.slice(i + 1, i + 2).toLocaleUpperCase()}${name.slice(i + 2)}`;
      i++;
    }
  }

  return name;
};

var randomDate = function () {
  var date = new Date();
  date.setDate(date.getDate() - Math.random() * 10000);
  return date;
};

var generateReview = function (productId, reviewId, reviewer) {
  var title = `${productAdjective()} ${productNoun()}`;
  var overall = Math.ceil(Math.random() * 50) / 10;
  var anchor = 10 * (overall < 1.25 ? 0 : overall > 3.75 ? 2.5 : overall - 1.25);
  var recommended = Math.random() < overall / 5;
  var subScore = function () {
    return Math.round(anchor + Math.ceil(Math.random() * 25)) / 10;
  };

  return {
    reviewId,
    productId,
    overall,
    easeOfAssembly: subScore(),
    valueForMoney: subScore(),
    productQuality: subScore(),
    appearance: subScore(),
    worksAsExpected: subScore(),
    recommended,
    title,
    reviewText: opinion(title),
    reviewerName: reviewer.name,
    reviewerId: reviewer.id,
    date: randomDate()
  };
};

var generateReviewers = function () {
  var reviewers = [];

  for (var i = 1; i <= 100; i++) {
    reviewers.push({
      id: i,
      name: randomName()
    });
  }

  return reviewers;
};


var generateReviews = function () {
  var reviewId = 1;
  //var reviews = [];
  var reviewers = generateReviewers();
  for (var productId = 1; productId <= 10000000; productId++) {
    var randomThreshold = Math.pow(Math.random(), 2);
    var randomTry = Math.random();
    var shuffledReviewers = shuffleDeck(reviewers);
    var reviewer = 0;
    while (randomTry > randomThreshold && reviewer < 5) {
      //reviews.push(generateReview(productId, shuffledReviewers[reviewer]));
      let review = generateReview(productId, reviewId, shuffledReviewers[reviewer]);
      let line = `${review.reviewId}, ${review.productId}, ${review.overall}, ${review.easeOfAssembly}, ${review.valueForMoney}, ${review.productQuality}, ${review.appearance}, ${review.worksAsExpected}, ${review.recommended}, ${review.title}, ${review.reviewText}, ${review.reviewerName}, ${review.reviewerId}, ${review.date} + \n`
      fs.appendFileSync('./sampleData/original-seed-data.csv', line, err => {
        if (err) {
          console.error(err);
          return;
        }
      });
      reviewId++;
      reviewer++;
      randomTry = Math.random();
    }
  }
};

module.exports = generateReviews;