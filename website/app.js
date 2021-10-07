
/************* [1] Global Variables ***************/

// Create a new date instance dynamically with JS
const  day = new Date();
const newDate = (day.getMonth() + 1) + '/'+ day.getDate()+'/'+ day.getFullYear();

// the first part of the api link to fetch the data 
const baseurl = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// my key on the [https://openweathermap.org]
const api_key = '&appid=c98b366f107c387fa48b86610491e6e0&units=metric';

// url of the server 
const server  = 'http://localhost:8000';

// get the button 
const button = document.getElementById('generate');




/************* [2] functions used  ***************/

// this function for fetch the required data from the api 
const getWeatherData = async (zip)=>{
    try{
        // fetch the data from the api 
        const res = await fetch(baseurl+zip+api_key);

        // transfer the returned data to json to be readable
        const data = await res.json();

        return data;

    }catch(err){
        console.log('error:',err)
    }
}



// this function to send the collected data to the server
const send_data_to_server = async(Url ,Info)=>{
    // send the data to the server side 
    const res = await fetch(Url , {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(Info)
    })
    try{
        const newData = await res.json();
        return newData;
    }catch(err){
        console.log('error:' , err.json);
    }
}

// this function to fetch the data from the server and print it on the screen 
const updating_UI_Data = async()=>{
    try{
        // fetch data from the server side 
        const returned_data = await fetch(server+'/all');

        // return that data after translated it to json 
        return returned_data.json();

        // handle the error
    }catch(err){
        console.log(err)
    }
}


// this function will trigger on cklick the button 
const getAllData = ()=>{
    debugger
    // get the value from the zip input box 
    const zip = document.getElementById('zip').value;
    
    // get the value from the feeling input box 
    const feelings = document.getElementById('feelings').value;
    
    // triger the [getWeatherData] function 
    getWeatherData(zip)
    .then((data)=>{

        //check if the data arrived from the Api or not 
        console.log('this data fetched from the Api')
        console.log(data)

        // distructuring the data into variables 
        const {
            main: {temp},
            name: city ,
        }= data

        // make a new object with all require data from (user and Api)
        const Info = {
            date: newDate,
            city : city,
            temperature: Math.round(temp),
            feelings
        }

        // check on the latest lock of data 
        console.log('this is the data that will send to the server ')
        console.log(Info)

        // trigger the [send_data_to_server]  function
        send_data_to_server(server+'/add',Info)

        // trigger the [updating_UI_Data] function
        updating_UI_Data()
        .then((returned_data)=>{

            // check if the data returned back from the server or not 
            console.log('this data returned back from the server ')
            console.log(returned_data)


            // print the returned data on the screen
            document.getElementById('title').innerHTML= 'The most recent entry'
            document.getElementById('date').innerHTML= 'date:' + returned_data.date;
            document.getElementById('city').innerHTML= 'city:' + returned_data.city;
            document.getElementById('temp').innerHTML= 'temprature:' + returned_data.temperature + '&deg';
            document.getElementById('feelngs').innerHTML= returned_data.feelings;

            document.querySelector('.entry').classList.add('show')
        }) 
        
    })
}




// add event listener to the button 
button.addEventListener('click' , getAllData)