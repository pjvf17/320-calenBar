const REST_API_URL = 'http://127.0.0.1:8000'

class Service{

    async getCalendars(){
        let data = await fetch(`${REST_API_URL}/calendars`, {method: "GET"})
        let json = await data.json()
        // console.log(json)
        return json
    }


    addTask(calendarId, task, setReloadCalendar){
        return fetch(`${REST_API_URL}/calendars/${calendarId}/add_task/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(res => res.json())
        .catch(err => console.log(err))
    }

    editTask(calendarId, task, setReloadCalendar){
        return fetch(`${REST_API_URL}/calendars/${calendarId}/update_task/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(res => res.json())
        .catch(err => console.log(err))
    }

    deleteTask(calendarId, taskId) {
        return fetch(`${REST_API_URL}/calendars/${calendarId}/delete_task/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: taskId})
        })
        .then(res => res.status)
        .catch(err => console.log(err))
    }

    registerUser(user){
        
    }

    loginUser(user){

    }

}

export default new Service()