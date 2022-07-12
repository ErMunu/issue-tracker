const issueButtons = document.querySelectorAll('.issue-btn');
const authorButtons = document.querySelectorAll('.author-btn');
const issues = document.querySelectorAll('.issue');

issueButtons.forEach(issueButton => {
    issueButton.addEventListener('click', (e) => {

        issues.forEach(issue => {
            if (issue.childNodes[3].childNodes[1].innerText.trim() !== e.target.innerText){
                issue.classList.add('hide-issue');
                issue.classList.remove('show-issue');
            } else {
                issue.classList.add('show-issue');
                issue.classList.remove('hide-issue');
            }
        })

    })
});

authorButtons.forEach(authorButton => {
    authorButton.addEventListener('click', (e) => {
        
        issues.forEach(issue => {
            if (issue.childNodes[1].childNodes[1].innerText.trim() !== e.target.innerText){
                issue.classList.add('hide-issue');
                issue.classList.remove('show-issue');
            } else {
                issue.classList.add('show-issue');
                issue.classList.remove('hide-issue');
            }
        })

    })
});