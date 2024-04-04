document.addEventListener('DOMContentLoaded', ()=>{

    // 1.При вводе текста задача должно появиться в колонке To Do:{
    //       1.Когда кнопка нажимается
    //       2. value попадает с помощью
    //
    // 2.
    const data = localStorage.getItem('data');
    let dataList = [];
    if(data !== '' && data !== null){
        dataList = JSON.parse(data) ;  
    }
    

    const missionInput = document.querySelector('#input');
    const colTask = document.querySelector('.div__to-do');
    const btnAdd = document.querySelector('.div__header-button');
    const statusName = ['in Progress', 'Done', 'Delete'];

    const addTask = (mission , parent, statusName) =>{

        const divTask = document.createElement('div');
        divTask.className = 'div__to-do-task';
        divTask.innerHTML = `<span class="div__task-text">${mission.missionValue}</span>
                            <button class="div__close-btn">X</button>
                            <button class="div__progress-btn" id = "progress-btn">${statusName}></button>
                            <p class = "idTask"  data-id="${mission.id}"></p>` 
        parent.append(divTask);
    }

    dataList.forEach(element => {
        addTask(element , colTask, statusName[0])
    });
    

    const getRandomKey = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);//Перебираем случайный ID

    

    btnAdd.addEventListener('click', (e)=>{
        e.preventDefault();
        const missionValue = missionInput.value;
        const id = getRandomKey();

        const mission ={
            missionValue,
            id,
        }
        dataList.push(mission);
        addTask(mission , colTask, statusName[0]);
        localStorage.setItem('data', JSON.stringify(dataList));
        
    });
    
    
    const colProgrees = document.querySelector('.div__in-progress')
    const parentToDo = document.querySelector('.div__to-do');

    let listProgress = [];
    const dataProgress = localStorage.getItem('prog');
    if(dataProgress !== '' && dataProgress !== null){
        listProgress = JSON.parse(dataProgress)
    }
    listProgress.forEach(element => {
        addTask(element , colProgrees , statusName[1])
    });

    const getId = e =>{

        const idTask = e.target.closest('.div__to-do-task').querySelector('.idTask');
        return id = idTask.dataset.id;
    }
    const closeCard = e =>{
        const toDoRemove = e.target.closest('.div__to-do-task');
        if(toDoRemove){
            toDoRemove.remove();
        }
    }

    const removeBtn = (e)=>{
        getId(e);
        let items = JSON.parse(localStorage.getItem('data'));
        let indexToRemove = items.findIndex(item => String(item.id) === id)
        if(indexToRemove !== -1){
            items.splice(indexToRemove, 1) 
            localStorage.setItem('data', JSON.stringify(items));
            dataList = items;
            
        }
    }

    parentToDo.addEventListener('click', e =>{
        
        if(e.target.classList.contains('div__progress-btn')){
            getId(e);
            let indexToProgress = dataList.find(item => String(item.id) === id);
            if(indexToProgress){
                const indexToRemove = dataList.indexOf(indexToProgress);
                dataList.splice(indexToRemove, 1);  

                localStorage.setItem('data', JSON.stringify(dataList));

                listProgress.push(indexToProgress);
                localStorage.setItem('prog', JSON.stringify(listProgress));

            }
            e.target.textContent = "Done";
            const toDo = e.target.closest('.div__to-do-task');
            document.querySelector('.div__in-progress').appendChild(toDo);
        }else if(e.target.classList.contains('div__close-btn')){
            removeBtn(e);
            closeCard(e);
        }
    })


    const parentProgress = document.querySelector('.div__in-progress');
    let listDone = [];
    const dataDone = localStorage.getItem('done');
    if(dataDone !== '' && dataDone !== null){
        listDone = JSON.parse(dataDone)
    }
    const colDone = document.querySelector('.div__done')
    listDone.forEach(element => {
        addTask(element , colDone , statusName[2])
    });
    
    parentProgress.addEventListener('click', e =>{
        if(e.target.classList.contains('div__progress-btn')){
            getId(e);
            let indexToProgress = listProgress.find(item => String(item.id) === id);
            if(indexToProgress){
                const indexToRemove = listProgress.indexOf(indexToProgress);
                listProgress.splice(indexToRemove, 1);  

                localStorage.setItem('prog', JSON.stringify(listProgress));

                listDone.push(indexToProgress);
                localStorage.setItem('done', JSON.stringify(listDone));
            }
            e.target.textContent = "Delete";
            const progress = e.target.closest('.div__to-do-task');
            document.querySelector('.div__done').appendChild(progress);
             
        }else if(e.target.classList.contains('div__close-btn')){
            getId(e);
            let items = JSON.parse(localStorage.getItem('prog'));
            let indexToRemove = items.findIndex(item => String(item.id) === id);
            if(indexToRemove !== -1){
                items.splice(indexToRemove, 1);
                localStorage.setItem('prog', JSON.stringify(items));
                listProgress = items;
            }
            closeCard(e);
        }
    })
    const parentDone = document.querySelector('.div__done');

    parentDone.addEventListener('click', e =>{
        if(e.target.classList.contains('div__progress-btn') || e.target.classList.contains('div__close-btn')){
            getId(e);
            let items = JSON.parse(localStorage.getItem('done'));
            let indexToRemove = listDone.findIndex(item => String(item.id) === id);
            if(indexToRemove !== -1){
                items.splice(indexToRemove, 1);
                localStorage.setItem('done', JSON.stringify(items));
                listDone = items;
                console.log(listProgress);
                
            }
            closeCard(e);
        }
    })

})









