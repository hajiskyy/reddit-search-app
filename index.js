import reddit from './redditapi';

const searchInput = document.getElementById('search-input');
const form = document.getElementById('form');

form.addEventListener('submit', e => {
    const searchstr = searchInput.value;
    if(searchstr === ''){
        alert('please enter a username');
    }

    // Clear input
    searchInput.value = '';

    // Search reddit
    reddit.search(searchstr)
    .then(results => {
        let output = '<div class ="row"><div class="col">';
        results.forEach(post => {

            let image = post.preview ? post.preview.images[0].source.url :  'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';

            output += `
            <div class="card large">
                <div class="card-image">
                    <img src="${image}">
                </div> 
                <div class="card-content black-text">
                <span class="card-title black-text bold">${truncateText(post.title, 100)}</span>
                <p class="black-text">${truncateText(post.selftext,100)}</p>
            </div>
            <div class="card-action">
                <a href="${post.url}" target="_blank">Read more</a>
                <hr>
                <span class="blue badge white-text">Subreddit: ${post.subreddit}</span>
                <span class="black badge white-text">Subreddit: ${post.score}</span>
            </div>
            </div>
                
            `;
        });
        output += '</div></div>'
        document.getElementById('results').innerHTML = output;
    });
    
    e.preventDefault();
})

function truncateText(str, limit) {
    const short = str.indexOf(' ', limit);
    if(short == -1) return str;
    str = str.substring(0, short);
    str += "....";
    return str;
}
