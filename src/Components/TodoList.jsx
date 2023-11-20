import React, { useEffect, useState } from 'react'
import Profile from '../Images/ProfileIcon.png'
import { MyContext } from '../Context/Context';
import { useContext } from 'react';

const TodoList = ({ props }) => {
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
    const [height, setHeight] = useState(false);
    const [display, setDisplay] = useState(false);

    const [readonly, setReadonly] = useState(false);
    const [count, setCount] = useContext(MyContext);

    useEffect(() => {
        setAddTask([...addTask, 1])
    }, [])

    const saveTask = () => {
        const task = {
            name,
            age,
            gender,
            country,
            desc
        }

        setAddTask([addTask.slice(addTask.length - 1, task)])

        setHeight(100);

        setDisplay(true);

        setEdit(true)

        //disable editing of all tags
        setReadonly(true);
    }

    //Expand the Task
    const showTask = () => {
        setHeight(false);
        setDisplay(false);
        setExpand(!expand)
    }

    const closeTask = () => {
        console.log("close")
        setHeight(true);
        setDisplay(true);
        setExpand(!expand)
    }
    return (
        <div>

            <form action="" className='form'>

                <div className='form-field'>
                    <label htmlFor="service"></label>
                    {
                        addTask.map((ele, index) => (
                            <div className='task-container' style={{ height: height ? '70px' : '350px' }} >
                                <div className="serviceHeader">
                                    <div className="left">
                                        <img className='profileImg' src={Profile} />
                                        <input className='name' type="text" onChange={(e) => setName(e.target.value)} value={ele.name} readOnly={readonly} />
                                    </div>
                                    {expand ? <i class="fa fa-chevron-down" aria-hidden="true" onClick={showTask}></i> : <i class="fa fa-chevron-up" aria-hidden="true" onClick={closeTask}></i>}
                                </div>

                                <div className="serviceMid" style={{ display: display ? "none" : "flex" }}>
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

                                <div className='serviceDesc' style={{ display: display ? "none" : "block" }}>
                                    <p>Description</p>
                                    <textarea value={ele.desc} name="" id="" cols="10" rows="4" onChange={e => setDesc(e.target.value)}></textarea>
                                </div>

                                {edit ?
                                    <div className="editButton" style={{ display: display ? "none" : "flex" }}>

                                        <div className="delete">
                                            <i class="fa fa-trash" aria-hidden="true"></i>
                                        </div>

                                        <div className="edit">
                                            <i class="fa fa-pencil" aria-hidden="true" onClick={() => setReadonly(true)}></i>
                                        </div>
                                    </div>
                                    :
                                    <div className="editButton" style={{ display: display ? "none" : "flex" }}>

                                        <div className="cancel">
                                            <i class="fa fa-times" aria-hidden="true" ></i>
                                        </div>

                                        <div className="save">
                                            <i class="fa fa-check" aria-hidden="true" onClick={saveTask}></i>
                                        </div>
                                    </div>
                                }

                            </div>
                        ))
                    }
                </div>
            </form>
        </div>
    )
}

export default TodoList