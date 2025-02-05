let allCountries = document.querySelector('#country');

fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));

        data.forEach((country) => {
            allCountries.innerHTML += `<option value="${country.cca2.toLowerCase()}">${country.name.common}</option>`;
        });
    })
    .catch((error) => console.error("Error fetching countries:", error));



let submitBtn = document.querySelector('.submitDataBtn');

submitBtn.addEventListener('click' , ()=>{
    
    
    
    let cc = document.querySelector('#country').value;
    let profession = document.querySelector('#profession').value;
    let keyword = document.querySelector('#job-search').value;
    
    if(!cc && !profession){
        document.querySelector('.errorMessage').innerText = 'Error Fetching Details Provide Correct parameters'
        return;
    }
    document.querySelector('.errorMessage').innerText = '';
    document.querySelector('.loader_parent').style.display = 'block';

    let APIID = '7c034b37';
    let APIKEY = 'd0edcb39559442ae8511483c2be7a698';
    //  let URL = `http://api.adzuna.com/v1/api/jobs/in/top_companies?app_id=${apiID}&app_key=${apiKey}&what=engineer&content-type=application/json`
    let URL1 = `http://api.adzuna.com/v1/api/jobs/${cc}/search/1?app_id=${APIID}&app_key=${APIKEY}&results_per_page=100&what=${profession}$&content-type=application/json`


    let URL2 = `http://api.adzuna.com/v1/api/jobs/${cc}/search/1?app_id=${APIID}&app_key=${APIKEY}&results_per_page=100&what=${keyword}&content-type=application/json`


    fetch(URL1)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        if(data.results.length!=0){
            document.querySelector('.loader_parent').style.display = 'none';
            document.querySelector('.errorMessage').innerText = 'Success!';
        }
        else if(data.results.length == 0){
            alert("No such Category Found :(");
        }
        let prev = document.querySelectorAll('.job-card');
        prev.forEach((pre)=>{
            pre.remove();
        })
        data.results.forEach((job)=>{
            createTicket(job);
        })
    })


    fetch(URL2)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        if(data){
            document.querySelector('.loader_parent').style.display = 'none';
        }
        else if(data.results.length == 0){
            alert("No such Category Found :(");
        }
        data.results.forEach((job)=>{
            createTicket(job);
        })
    })



})



function createTicket(job){
    let jobCard = document.createElement('div');
    let location = "";
    for(let i = job.location.area.length - 1; i>=1; i--){
        location+=job.location.area[i];
        if(i!=1){
            location+=" , ";
        }
    }

    jobCard.classList.add('job-card');
    jobCard.innerHTML = `
        <div>
        <h3>${job.title}</h3>
        <p><strong>Company : </strong><b>${job.company.display_name}</b></p>
        <p><strong>Location : </strong>${location}</p>
        <p><strong>Posted : </strong>Recently</p>
        </div>
        <div>
        <a href="${job.redirect_url}" target="_blank">View Job</a>
        </div>
    `

    document.querySelector('#job-list').appendChild(jobCard);


}

