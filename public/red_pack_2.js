let BLACK_CARDS = [
    'The Stasi recently uncovered a secret plot involving __.',
    'To maintain order, the DDR government has outlawed __.',
    'While the West had Coca-Cola, East Germans had __.',
    'Newly released Stasi files reveal that __ was more widespread than previously thought.',
    'East Berlin&#39;s hottest underground club is __.',
    'Comrade, you have been accused of __. How do you plead?',
    'In the DDR, we don&#39;t have capitalism. We have __.',
    'Welcome to the Workers&#39; Paradise! Here, everyone enjoys __.',
    'To cross the Berlin Wall, one must first get past __.',
    'Rumor has it Erich Honecker&#39;s private bunker was filled with __.',
    'The Stasi has eyes everywhere. You can&#39;t even __ without being watched.',
    'At the latest party meeting, it was decided that __ will be the new national policy.',
    'We regret to inform you that your application to leave the DDR has been denied due to __.',
    'The People&#39;s Police recently arrested someone for __.',
    'Today&#39;s lesson in Marxist-Leninist ethics will focus on __.',
    'The DDR&#39;s latest five-year plan prioritizes __ above all else.',
    'All hail our glorious leader! Long may he bring us __.',
    'While the West indulges in decadence, we in the DDR proudly embrace __.',
    'The only way to escape the DDR is through __.',
    'Checkpoint Charlie is closed today due to __.',
    'A true socialist must be willing to sacrifice __ for the greater good.',
    'The latest crackdown has made __ illegal.',
    'Under socialism, we no longer suffer from __.',
    'The Ministry of State Security has launched a new initiative against __.',
    'Western spies have infiltrated the DDR, spreading dangerous ideas about __.',
    'The Soviet Union has gifted East Germany a generous supply of __.',
    'To test your loyalty, please write a detailed report on __.',
    'In response to capitalist propaganda, the government has issued a mandatory training session on __.',
    'The Stasi recently uncovered a secret plot involving __.',
    'Comrade, your loyalty to the Party is unquestionable, but we need to talk about your involvement in __.',
    'You&#39;ve been summoned by the Stasi for questioning about your suspicious __ activities.',
    'The Party has decided that you must be re-educated for __.',
    'In the most recent propaganda video, the people are told to beware of __.',
    'The Berlin Wall fell, but only because the Stasi was secretly building __.',
    'After years of surveillance, the Stasi uncovered that you&#39;ve been hoarding __.',
    'The Ministry of State Security has confirmed that you&#39;ve been secretly listening to __.',
    'Your defection to the West was foiled when the Stasi intercepted your plan to __.',
    'If the Party discovers you&#39;ve been __, there will be severe consequences.',
    'You&#39;ve been summoned to the Ministry of Truth to explain why you&#39;ve been writing __.',
    'In a recent interrogation, it was revealed that you&#39;ve been smuggling __ into East Berlin.',
    'Your neighbor, who works for the Stasi, reported you for __.',
    'The Stasi has been monitoring your every move, and now they suspect you of __.',
    'The Party&#39;s greatest fear is that you&#39;ve been secretly __ without authorization.',
    'Comrade, your loyalty is now questioned due to your suspicious interest in __.',
    'The Stasi has evidence of your underground radio broadcasts of __.',
    'You&#39;ve been spotted attending a forbidden gathering about __, and now the Stasi is investigating.',
    'It&#39;s clear the Party doesn&#39;t approve of your recent obsession with __.',
    'The most recent Stasi report says that you&#39;ve been acting suspiciously by __.',
    'A traitor has been exposed: they were caught smuggling __ out of East Germany.',
    'Rumor has it you&#39;ve been attempting to escape via __, but the Stasi is one step ahead.',
    'The Party has been monitoring your every word, and now they are concerned about your views on __.',
    'In your latest confession, you admitted to __, and now you face severe punishment.',
    'The Stasi has tapped your phone line and found evidence of your secret admiration for __.',
    'The latest Party report warns about a new underground movement called __.',
    'If you&#39;re caught again, the Party may send you to __ for re-education.',
    'It&#39;s clear that the secret police have evidence of your illegal involvement in __.',
    'In the latest edition of the Party&#39;s newspaper, __ is denounced as an act of betrayal.',
    'During your interrogation, you were caught trying to bribe an officer with __.',
    'The Party believes your recent behavior involving __ may be a sign of rebellion.',
    'The Stasi has traced your secret communications about __, and now they&#39;re watching you closely.',
    'Your forced confession was so convincing, but they still don&#39;t believe you weren&#39;t involved in __.',
    'In a shocking turn of events, you&#39;ve been found guilty of secretly __ during your time in the Party.',
    'The Stasi recently uncovered your attempt to __ using a hidden tunnel to West Berlin.',
    'You&#39;ve been labeled an enemy of the people due to your support for __.',
    'The Party has decided to intervene after your “accidental” attempts to __.',
    'During your latest interrogation, you inadvertently admitted to __, making it harder to deny.',
    'The Party will not stand for any __, and they&#39;re coming for you next.',
    'The Ministry of State Security has intercepted your __ letters to the West.',
    'The only way to escape the wrath of the Stasi is to confess your involvement in __.',
    'Your loyalty to the state has been questioned after reports surfaced that you&#39;ve been __.',
    'The Stasi has planted __ in your house, and they&#39;re waiting for you to slip up.',
    'A recent investigation into your activities uncovered your shocking involvement in __.',
    'Your family has been accused of being traitors due to their connection to __.',
    'There&#39;s a new law in the Party, forbidding __ under any circumstances.',
    'Comrade, you&#39;ve been called in for questioning regarding your unusual obsession with __.',
    'We&#39;ve received reports that you&#39;ve been passing information about __ to the West.',
    'You&#39;ve been caught trying to smuggle __ across the border. Your fate is uncertain.',
    'Your file is under investigation after it was revealed that you&#39;ve been secretly __.',
    'The Party has placed you on the blacklist for your suspicious activities involving __.',
    'It seems your idea of “revolutionary progress” involves a little too much __.',
    'A recent wiretap has exposed your plan to __ using state resources.',
    'The Party has decided to assign you a re-education camp, but only after you explain why you were found with __.',
    'You&#39;ve been marked as a potential threat to the regime after your activities involving __.',
    'The Stasi believes you may be hiding a stash of __, and they&#39;re about to search your house.',
    'After an unexpected raid, you were found with contraband __ that the Party strictly forbids.',
    'A report has surfaced claiming that you&#39;ve been attempting to escape East Germany by __.',
    'The latest Party directive warns that anyone caught involved in __ will face immediate punishment.',
    'During your last loyalty test, you were caught suggesting that the Party was wrong about __.',
    'The Stasi is aware of your secret love for __, and they&#39;ve placed you under surveillance.',
    'After a failed escape attempt, the Stasi found you trying to flee to the West with __.',
    'The Ministry of Internal Affairs has uncovered a conspiracy involving you and __.',
    'Rumor has it you&#39;ve been secretly exchanging information about __ with outsiders.',
    'You&#39;ve been spotted at a forbidden gathering discussing __, and now the Stasi is after you.',
    'The Party suspects you&#39;ve been conspiring with foreign powers to __.',
    'In a shocking betrayal, your best friend was caught trying to smuggle __ through the checkpoint.',
    'You&#39;ve been identified as a possible counter-revolutionary due to your interest in __.',
    'The Stasi intercepted your coded messages, and they suspect you&#39;ve been working on __.',
    'Your secret radio station broadcasts forbidden __ to the people, and now the authorities are listening.',
    'You&#39;ve been under suspicion ever since your unauthorized trip to __.',
    'An anonymous tip has accused you of participating in __ with the enemies of the state.',
    'Your attempt to escape through the sewers was foiled when you were caught with __.',
    'In your forced confession, you revealed that you were plotting to __.',
    'The Stasi found evidence that you&#39;ve been stockpiling __ in your apartment.',
    'You&#39;ve been deemed a "non-comrade" after suggesting that __ might not be the best approach.',
    'A mole within your group reported you for your involvement in __.',
    'The latest issue of the Party magazine features an exposé on your secret work with __.',
    'After extensive surveillance, the Stasi uncovered your plot to __ in broad daylight.',
    'Your forced confession detailed your involvement in the conspiracy to __.',
    'The Stasi is conducting a full investigation after discovering your secret stash of __.',
    'Comrade, we have your confession on record, but the Party still demands to know why you&#39;ve been involved with __.',
    'Reports have surfaced that you&#39;ve been attempting to overthrow the Party by __.',
    'The Ministry of State Security has received a tip-off about your secret meetings with __.',
    'Your reputation as a loyal Party member is now in jeopardy due to your association with __.',
    'The Stasi intercepted a letter to your family, revealing your plans to __.',
    'Comrade, we&#39;ve been informed of your suspicious actions involving __.',
];

let WHITE_CARDS = [
    'Trabbi',
    'Stasi',
    'Honecker',
    'Checkpoint',
    'Intershop',
    'Defection',
    'Surveillance',
    'Volksarmee',
    'Leninism',
    'Propaganda',
    'Informant',
    'Betrayal',
    'Censorship',
    'Interrogation',
    'Treason',
    'Rations',
    'Comrade',
    'Dissident',
    'Wall',
    'Bananas',
    'Queue',
    'RedArmy',
    'Collectivization',
    'Wiretap',
    'Blacklist',
    'Marxism',
    'Socialism',
    'Ministry',
    'Denunciation',
    'Smuggling',
    'Checkpoint Charlie',
    'Volkspolizei',
    'Agitprop',
    'Border',
    'Espionage',
    'Soviets',
    'Dictatorship',
    'Uprising',
    'Paranoia',
    'Interrogator',
    'Bureaucracy',
    'Prison',
    'Coca-Cola',
    'Microphone',
    'Secret Police',
    'Brandenburg',
    'Escape',
    'Ideology',
    'Survival',
    'RedTape',
    'Wall Jumping',
    'Traitor',
    'Wiretapping',
    'Files',
    'Passport',
    'Checkpoint Alpha',
    'Dictator',
    'Siberia',
    'East Berlin',
    'West Berlin',
    'Patriotism',
    'Exile',
    'Glasnost',
    'Perestroika',
    'Treason',
    'Socialist Realism',
    'Moscow',
    'Siberia',
    'Five-Year-Plan',
    'Secret Files',
    'Cold War',
    'Revolution',
    'Obedience',
    'Interrogation Room',
    'Suspicion',
    'Thought Crime',
    'Party Loyalty',
    'Oppression',
    'RationCard',
    'Gulag',
    'State Radio',
    'Wiretaps',
    'Soviet Vodka',
    'Iron Curtain',
    'State Security',
    'Politburo',
    'West Spy',
    'Berlin Wall',
    'Trabant Factory',
    'Party Member',
    'Central Committee',
    'People&#39;s Police',
    'Pravda',
    'Workers Paradise',
    'Checkpoint Bravo',
    'Interrogation Lamp',
    'Radio Free Europe',
    'Blockwart',
    'The Berlin Wall',
    'Stasi informant',
    'Checkpoint Charlie',
    'Defecting to the West',
    'Listening through the walls',
    'Secret police files',
    'Waiting in line',
    'Smuggling bananas',
    'Hiding from the Stasi',
    'Soviet occupation zone',
    'Party loyalty test',
    'Watching West German TV',
    'A Trabant that starts',
    'Reporting your neighbor',
    'Wiretapped phone calls',
    'Comrade Honecker&#39;s speeches',
    'The Iron Curtain',
    'Socialist realism paintings',
    'Propaganda posters everywhere',
    'A mysterious black car',
    'Escaping through a tunnel',
    'The people&#39;s paradise',
    'Mandatory Marxist education',
    'The Ministry for State Security',
    'An informant in every room',
    'Border guards with rifles',
    'State-approved literature',
    'The Volkspolizei checkpoint',
    'Censorship of Western music',
    'Collectivized potato farms',
    'Vodka-fueled revolution',
    'Cold War paranoia',
    'A ration card for bread',
    'The Five-Year Plan',
    'Banned rock and roll',
    'A hidden radio receiver',
    'Fleeing under gunfire',
    'Lenin&#39;s stern portrait',
    'A forced confession',
    'State-sponsored surveillance',
    'A suitcase full of Ostmarks',
    'The Red Army choir',
    'A wall covered in graffiti',
    'Listening to Radio Free Europe',
    'Singing the Internationale',
    'Living in a Plattenbau',
    'The Stasi knocking at midnight',
    'Checkpoint Alpha security check',
    'A Trabant running on fumes',
    'Spying on your best friend',
    'A Soviet military parade',
    'An empty grocery store',
    'Treason against the state',
    'Glasnost and perestroika',
    'A failed escape attempt',
    'Red tape everywhere',
    'Secret tunnels under Berlin',
    'A party-approved haircut',
    'A portrait of Marx',
    'The Politburo&#39;s final decision',
    'A smuggled Western newspaper',
    'A fake passport and a dream',
    'State-controlled television',
    'A book full of redactions',
    'An informant at the bar',
    'A Trabant with no brakes',
    'A wall that must fall',
    'A school trip to Moscow',
    'Interrogation under a spotlight',
    'A midnight arrest',
    'A Soviet tank rolling in',
    'A childhood of suspicion',
    'A bureaucratic nightmare',
    'A tunnel to West Berlin',
    'A secret meeting in the forest',
    'A forbidden Beatles record',
    'A bug hidden in the lamp',
    'A lifetime of surveillance',
    'A sudden knock on the door',
    'A rationed loaf of bread',
    'A speech full of lies',
    'A passport stamped “denied”',
    'A comrade&#39;s suspicious glance',
    'A failed socialist utopia',
    'A government-issued opinion',
    'A radio jamming station',
    'A smuggled Levi&#39;s jacket',
    'A whispered conspiracy theory',
    'A suspiciously friendly neighbor',
    'A guard dog at the border',
    'A loyalty oath to the Party',
    'A Trabant breaking down again',
    'A smuggled cassette tape',
    'A bag full of Ostmarks',
    'Bugging a telephone',
    'Burning documents',
    'Climbing the Berlin Wall',
    'Defecting to the West',
    'Denouncing a comrade',
    'Destroying evidence',
    'Escaping through a tunnel',
    'Evading the Stasi',
    'Faking loyalty',
    'Forgetting your papers',
    'Glorifying socialism',
    'Hiding contraband',
    'Informing on a neighbor',
    'Interrogating a suspect',
    'Jamming radio signals',
    'Listening through the walls',
    'Lying to the authorities',
    'Manufacturing propaganda',
    'Memorizing the Party line',
    'Monitoring dissidents',
    'Narrowly avoiding capture',
    'Opening secret files',
    'Patrolling the border',
    'Printing forbidden books',
    'Rationing food',
    'Reading banned literature',
    'Reporting suspicious behavior',
    'Running from the border guards',
    'Selling black market goods',
    'Shredding classified documents',
    'Signing a forced confession',
    'Smuggling Western goods',
    'Sneaking past the checkpoint',
    'Spying on your friends',
    'Surviving the interrogation',
    'Tapping phone lines',
    'Tearing down a poster',
    'Tracking political dissidents',
    'Trying to flee',
    'Undergoing reeducation',
    'Watching forbidden TV',
    'Whispering in a café',
    'Worshipping Karl Marx',
    'Writing a secret letter',
    'Writing an anonymous pamphlet',
    'X-raying mail for contraband',
    'Yielding to Party pressure',
    'Zealously defending socialism',
    'Accusing an enemy of the state',
    'Arresting a dissident',
    'Assembling in secret',
    'Avoiding surveillance',
    'Blackmailing a politician',
    'Bribing a border guard',
    'Bugging an apartment',
    'Burning Western books',
    'Changing identities',
    'Circulating underground newspapers',
    'Climbing the Berlin Wall',
    'Confessing under duress',
    'Cooperating with the Stasi',
    'Covering up corruption',
    'Crossing Checkpoint Charlie',
    'Dealing in ration coupons',
    'Defacing a propaganda poster',
    'Defecting to West Germany',
    'Destroying illegal documents',
    'Disappearing overnight',
    'Dodging the informants',
    'Dying at the border',
    'Editing party-approved news',
    'Eliminating opposition',
    'Erecting another statue of Lenin',
    'Escaping through a sewer',
    'Evading the secret police',
    'Fabricating evidence',
    'Faking loyalty to the Party',
    'Fearing a knock on the door',
    'Forgetting your identity card',
    'Forging travel papers',
    'Glorifying socialism',
    'Harassing suspected spies',
    'Hiding from the authorities',
    'Hoarding Western goods',
    'Identifying enemies of the state',
    'Imprisoning intellectuals',
    'Informing on a neighbor',
    'Interrogating a journalist',
    'Jailing a political enemy',
    'Jamming Western radio signals',
    'Laundering Party funds',
    'Lining up for bread',
    'Listening to Radio Free Europe',
    'Lying to a Stasi officer',
    'Manipulating public perception',
    'Manufacturing fake reports',
    'Memorizing party slogans',
    'Monitoring telephone calls',
    'Neutralizing dissent',
    'Obeying without question',
    'Opening secret police files',
    'Overhearing a dangerous joke',
    'Patrolling the border fence',
    'Planting false evidence',
    'Printing illegal flyers',
    'Professing loyalty to the Party',
    'Questioning your best friend',
    'Ransacking an apartment',
    'Rationing sugar and coffee',
    'Reading banned literature',
    'Recruiting new informants',
    'Removing suspicious citizens',
    'Reporting anti-socialist behavior',
    'Rewriting history books',
    'Running from border guards',
    'Sabotaging state property',
    'Scrawling graffiti on a wall',
    'Searching for contraband',
    'Selling information to the CIA',
    'Shaking hands with the General Secretary',
    'Shredding secret documents',
    'Shooting at defectors',
    'Signing a forced confession',
    'Smashing a typewriter',
    'Smuggling blue jeans',
    'Sneaking a Western magazine',
    'Spying on your own family',
    'Stockpiling ration cards',
    'Surveilling university students',
    'Suspecting everyone',
    'Tapping a telephone line',
    'Tearing down a Party banner',
    'Telling a joke about the General Secretary',
    'Tracking political enemies',
    'Trying to escape East Berlin',
    'Undergoing ideological reeducation',
    'Uprooting counter-revolutionaries',
    'Using an underground tunnel',
    'Voting with 99% approval',
    'Watching Western television in secret',
    'Whispering in a crowded room',
    'Worshipping Karl Marx',
    'Writing anonymous complaints',
    'Writing fake news for the Party',
    'X-raying packages for contraband',
    'Yielding to Party pressure',
    'Zealously defending communism',
    'Accusifying',
    'Bureaucratizing',
    'Checkpointing',
    'Comradesplaining',
    'Defectomizing',
    'Denunciating',
    'Dictatoring',
    'Disappearing',
    'Eavesdropping',
    'Eriching',
    'Expropriating',
    'File-shredding',
    'Glorifying',
    'Hoardinating',
    'Ideologizing',
    'Informanting',
    'Interrogasmirking',
    'Leninizing',
    'Listening',
    'Loyalizing',
    'Marxificating',
    'Memorizing',
    'Nationalizing',
    'Obediencing',
    'Overreporting',
    'Paranoifying',
    'Passporting',
    'Permitting',
    'Propagandizing',
    'Queueing',
    'Rationing',
    'Redwashing',
    'Reeducating',
    'Registering',
    'Revolutionizing',
    'Saluting',
    'Secretpolicing',
    'Shadowing',
    'Shaming',
    'Snooping',
    'Socialisting',
    'Speechcoding',
    'Statuefying',
    'Stasilurking',
    'Surveilling',
    'Suspecting',
    'Tattling',
    'Thoughtpolicing',
    'Tunnel-digging',
    'Unpersoning',
    'Vote-stuffing',
    'Wallfortifying',
    'Whisperdodging',
];



