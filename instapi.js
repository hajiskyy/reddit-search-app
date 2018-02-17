export default {
    search: function(user) {
        return fetch(`https://www.reddit.com/search.json?q=${user}&sort=${"relevalce"}&limit=${25}`)
        .then(res => res.json())
        .then(data => data.data.children.map(data => data.data))
        .catch(err => console.log(err));

    }
};