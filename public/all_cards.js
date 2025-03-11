fetch('cah-all-full.json')
    .then(response => response.json())
    .then(jsonData => {
        const navigator = new JSONNavigator(jsonData);

        function getAllOfficialPacks() {
            let i = 0;
            let official_packs = [];
            
            while (true) {
                let packName = navigator.get(i + '.name');
                if (packName === undefined) break;

                if (navigator.get(i + '.official')) {
                    official_packs.push(packName);
                }
                i++;
            }
            return official_packs;
        }
        //console.log("Official Packs:", getAllOfficialPacks());
    })
    .catch(error => console.error("Error loading JSON:", error));
