const REST_API_URL = 'http://127.0.0.1:8000/'

class Service{

    async getCalenders(){
        let data = await fetch(REST_API_URL + "calendars/", {method: "GET"})
        let json = await data.json()
        // console.log(json)
        return json
    }

    // getTasksByYearAndMonth(year, month){
    //     let task1 = {
    //         startDate: "2023-3-2",
    //         endDate: "2023-3-21",
    //         color: "blue",
    //         description: "first"
    //     }
    //     let task2 = {
    //         startDate: "2023-3-10",
    //         endDate: "2023-3-21",
    //         color: "green",
    //         description: "second"
    //     }
    //     let task3 = {
    //         startDate: "2023-3-21",
    //         endDate: "2023-3-24",
    //         color: "red",
    //         description: "third"
    //     }
    //     let task4 = {
    //         startDate: "2023-3-24",
    //         endDate: "2023-4-12",
    //         color: "orange",
    //         description: "fourth"
    //     }
    //     let task5 = {
    //         startDate: "2023-3-22",
    //         endDate: "2023-4-17",
    //         color: "cyan",
    //         description: "fifth"
    //     }
    //     return [task1, task2, task3, task4, task5]
    // }


    postTask(task){
        console.log(task)
    }

    deleteTask(task){

    }

    editTask(task){

    }

}

export default new Service()