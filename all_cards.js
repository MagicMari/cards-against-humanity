const fs = require('fs');
const JSONNavigator = require('./json_navigator'); // Import the class

class all_cards {

    constructor() {
        this.jsonFilePath = './public/cah-all-full.json';
        this.jsonData = JSON.parse(fs.readFileSync(this.jsonFilePath, 'utf8'));
        this.navigator = new JSONNavigator(this.jsonData);

        this.packIDs = {}

        let i = 0;
        
        while (true) {
            let packName = this.navigator.get(i + '.name');
            if (packName === undefined) break;
    
            this.packIDs[packName] = i;
            i++;
        }
    }

    replaceUnderscores(input) {
        let count = 0;
        return input.replace(/_/g, () => `_${++count}_`);
    }
    
    getAllOfficialPacks() {
        let i = 0;
        let official_packs = [];
        
        while (true) {
            let packName = this.navigator.get(i + '.name');
            if (packName === undefined) break;
    
            if (this.navigator.get(i + '.official')) {
                official_packs.push(packName);
            }
            i++;
        }
        return official_packs;
    }

    getAllCommunityPacks() {
        let i = 0;
        let community_packs = [];
        
        while (true) {
            let packName = this.navigator.get(i + '.name');
            if (packName === undefined) break;
    
            if (!this.navigator.get(i + '.official')) {
                community_packs.push(packName);
            }
            i++;
        }
        return community_packs;
    }

    getWhiteCardsFor(packs) {
        var whiteCards = [];
        packs.forEach(pack => {
            //console.log('Pack:', pack);
            //console.log('Pack ID:', this.packIDs[pack]);
            var currentCards = this.navigator.get(this.packIDs[pack] + '.white');
            currentCards.forEach(card => {
                whiteCards.push(card['text'])
            })
        });
        return whiteCards;
    }

    getBlackCardsFor(packs) {
        var blackCards = [];
        packs.forEach(pack => {
            console.log('Pack:', pack);
            console.log('Pack ID:', this.packIDs[pack]);
            var currentCards = this.navigator.get(this.packIDs[pack] + '.black');
            currentCards.forEach(card => {
                if(card['pick'] == 1) {
                    blackCards.push(card['text'])
                } else {
                    var replacedCard = this.replaceUnderscores(card['text'])
                }
            })
        });
        return blackCards;
    }
}

// Check environment and export properly
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = all_cards; // For Node.js
} else {
    window.JSONNavigator = JSONNavigator; // For Browser
}
