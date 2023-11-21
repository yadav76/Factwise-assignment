import React, { useState, useEffect } from 'react'
import SearchIcon from '../Images/SearchIcon.png'
import Profile from '../Images/ProfileIcon.png'

let delArr = [];
let displayArr = [];
let showEditBtn = [];
let copyTaskData = [];

const TodoInput = () => {

    const [addTask, setAddTask] = useState([]);
    const [edit, setEdit] = useState(false);
    const [expand, setExpand] = useState(true);

    //Set State for getting every value from Task Box
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [country, setCountry] = useState("");
    const [desc, setDesc] = useState("");

    //Shrink Size of taks after Save button clicked

    const [readonly, setReadonly] = useState(false);
    // const [count, setCount] = useContext(MyContext);

    const [searchText, setSearchText] = useState("");

    const [del, setDel] = useState(false);

    const style = {
        border: 'none',
        readonly: true,
    }

    useEffect(() => {
        let name;
        let data = addTask.filter(ele => {
            name = ele.name;
            return name.includes(searchText);
        })

        searchText === "" ? setAddTask(copyTaskData) : setAddTask(data);
    }, [searchText])

    const saveTask = (index) => {

        displayArr[index] = 0;

        showEditBtn[index] = 1;

        const task = {
            name,
            age,
            gender,
            country,
            desc
        }

        addTask[addTask.length - 1] = task;
        copyTaskData = addTask;
        setAddTask(addTask);

        setExpand(!expand)
    }

    //Expand the Task
    const showTask = (index) => {
        setExpand(!expand)

        displayArr[index] = 1;
    }

    const closeTask = (index) => {
        setExpand(!expand)

        displayArr[index] = 0;
    }

    const addNewTask = () => {
        setAddTask([...addTask, 1])
        displayArr.push(1);
        delArr.push(0);
        showEditBtn.push(0);
    }

    const deleteTask = (index) => {
        setDel(true);
        delArr[index] = 1;
    }

    return (
        <div>
            <h2>List View</h2>
            <div className="searchBar">
                <input type="text" onChange={(e) => {
                    setSearchText(e.target.value)
                }} className='searchInput' placeholder='Search User' />
                <img className='searchIcon' src={SearchIcon} alt="" />
            </div>

            {del ? <div className='delete-task'>
                <p>Are you sure you want to delete?</p>

                <div className="delete-btn">
                    <button onClick={() => {
                        setDel(false);
                    }}>Cancel</button>
                    <button className='del-btn' onClick={() => {
                        setDel(false);
                        window.scrollTo(0, 0);

                        addTask.splice(addTask.length - 1, 1);

                        setAddTask(addTask);
                    }}>Delete</button>
                </div>
            </div> : <div></div>}
            <div>

                <form action="" className='form'>

                    <div className='form-field'>
                        <label htmlFor="service"></label>
                        {
                            addTask.map((ele, index) => (
                                <div className='task-container' style={{ height: displayArr[index] == 0 ? "70px" : "350px" }} >
                                    <div className="serviceHeader">
                                        <div className="left">
                                            <img className='profileImg' src={Profile} />
                                            <input className='name' type="text" onChange={(e) => setName(e.target.value)} value={ele.name} readOnly={readonly} />
                                        </div>
                                        {expand ? <i class="fa fa-chevron-down" aria-hidden="true" onClick={() => showTask(index)}></i> : <i class="fa fa-chevron-up" aria-hidden="true" onClick={() => closeTask(index)}></i>}
                                    </div>

                                    <div className="serviceMid" style={{ display: displayArr[index] === 1 ? "flex" : "none" }}>
                                        <div className="age">
                                            <p>Age</p>
                                            <input type="text" value={ele.age} onChange={(e) => setAge(e.target.value)} />
                                        </div>
                                        <div className='gender' >
                                            <p>Gender</p>
                                            <select value={ele.gender} onChange={(e) => setGender(e.target.value)}>
                                                <option value="Rather not say">Rather not say</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                        <div className="country" >
                                            <p>Country</p>
                                            <input type="text" value={ele.country} onChange={e => setCountry(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className='serviceDesc' style={{ display: displayArr[index] === 1 ? "block" : "none" }}>
                                        <p>Description</p>
                                        <textarea value={ele.desc} name="" id="" cols="10" rows="4" onChange={e => setDesc(e.target.value)}></textarea>
                                    </div>

                                    {
                                        showEditBtn[index] === 1 ?
                                            <div className="editButton" style={{ display: displayArr[index] === 1 ? "flex" : "none" }
                                            } >

                                                <div className="delete">
                                                    <i class="fa fa-trash" aria-hidden="true" onClick={() => deleteTask(index)}></i>
                                                </div>

                                                <div className="edit">
                                                    <i class="fa fa-pencil" aria-hidden="true" onClick={() => setReadonly(true)}></i>
                                                </div>
                                            </div>
                                            :
                                            <div className="editButton" style={{ display: displayArr[index] === 1 ? "flex" : "none" }}>

                                                <div className="cancel">
                                                    <i class="fa fa-times" aria-hidden="true" onClick={() => {
                                                        displayArr[index] == 0;
                                                        setExpand(!expand);
                                                        showEditBtn[index] = 1;
                                                    }}></i>
                                                </div>

                                                <div className="save">
                                                    <i class="fa fa-check" aria-hidden="true" onClick={() => saveTask(index)}></i>
                                                </div>
                                            </div>
                                    }

                                </div>
                            ))
                        }
                    </div>
                </form >
            </div >
            <div className="button">
                <button className='btn' onClick={addNewTask}>+</button>
            </div>
        </div >
    )
}

export default TodoInput