class JSONNavigator {
    constructor(jsonData) {
        this.jsonData = jsonData;
    }

    get(path) {
        return path.split('.').reduce((acc, key) => acc && acc[key], this.jsonData);
    }

    set(path, value) {
        const keys = path.split('.');
        let obj = this.jsonData;

        while (keys.length > 1) {
            let key = keys.shift();
            if (!obj[key] || typeof obj[key] !== 'object') obj[key] = {};
            obj = obj[key];
        }
        obj[keys[0]] = value;
    }

    remove(path) {
        const keys = path.split('.');
        let obj = this.jsonData;

        while (keys.length > 1) {
            let key = keys.shift();
            if (!obj[key]) return;
            obj = obj[key];
        }
        delete obj[keys[0]];
    }

    search(value, currentPath = '', obj = this.jsonData, results = []) {
        if (typeof obj === 'object' && obj !== null) {
            for (let key in obj) {
                let newPath = currentPath ? `${currentPath}.${key}` : key;
                if (obj[key] === value) {
                    results.push(newPath);
                }
                this.search(value, newPath, obj[key], results);
            }
        }
        return results;
    }

    getAllKeys(obj = this.jsonData, prefix = '') {
        return Object.keys(obj).reduce((acc, key) => {
            const newPrefix = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                acc.push(newPrefix);
                acc.push(...this.getAllKeys(obj[key], newPrefix));
            } else {
                acc.push(newPrefix);
            }
            return acc;
        }, []);
    }

    export() {
        return JSON.stringify(this.jsonData, null, 2);
    }
}

// Export for both Node.js and browser
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = JSONNavigator; // Node.js (CommonJS)
} else {
    window.JSONNavigator = JSONNavigator; // Browser (attach to window object)
}
