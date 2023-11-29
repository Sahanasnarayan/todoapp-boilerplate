import React, { useCallback, useState, useEffect } from 'react';
import './body.component.scss';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";;
import { MdDone } from "react-icons/md";
import { FcSynchronize } from "react-icons/fc";
import { AccessService } from '../../../services';
import { ToastContainer, toast } from 'react-toastify';

export default function Body(): React.ReactElement {
    const [showDescriptionInput, setShowDescriptionInput] = useState(false);
    const [desc, setDesc] = useState('');
    const [title, setTitle] = useState('');
    const [todos, setTodos] = useState([]);
    const [updateTaskId, setUpdateTaskId] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDesc, setUpdatedDesc] = useState('');
    const accessService = new AccessService();

    const toggleDescriptionInput = () => {
        setShowDescriptionInput(!showDescriptionInput);
    };
    const handleFinishClick = () => {
        setShowDescriptionInput(false);
    };
    const addTodo = useCallback(async (e) => {
        e.preventDefault();

        try {
            const userId = localStorage.getItem('accountId');
            const token = localStorage.getItem('token');
            await accessService.add(userId, token, desc, title);
            toast.success('Task added successfully');
            setDesc('');
            setTitle('');
            fetchTodos();
        } catch (e) {
            if (!title) {
                toast.warning('Please enter task title.')
            }
            if (!desc) {
                toast.warning('please enter task description.')
            }
            else {
                toast.error('Something went wrong, Please try again with valid credentials.');
            }
        }
    }, [accessService, desc, title]);

    const fetchTodos = async () => {
        const userId = localStorage.getItem('accountId');
        const token = localStorage.getItem('token');

        try {
            const response = await accessService.getAll(userId, token);
            setTodos(response.data);
        } catch (e) {
            toast.error('Error occurred during fetching the data: ${e}');
        }
    }

    useEffect(() => {
        fetchTodos();
    }, [])

    const complete = async (taskId, title, description, isComplete) => {
        const userId = localStorage.getItem('accountId');
        const token = localStorage.getItem('token');

        try {
            await accessService.update(userId, token, taskId, title, description, isComplete);
            fetchTodos();
        } catch (e) {
            toast.error('An error occurred: ${e}');
        }
    }

    const update = async (taskId, currentTitle, currentDesc) => {
        setUpdateTaskId(taskId);
        setUpdatedTitle(currentTitle);
        setUpdatedDesc(currentDesc);
    }

    const cancel = () => {
        setUpdateTaskId(null);
        setUpdatedTitle(updatedTitle);
        setUpdatedDesc(updatedDesc);
    }

    const save = async (taskId, isComplete) => {
        const userId = localStorage.getItem('accountId');
        const token = localStorage.getItem('token');

        try {
            await accessService.update(userId, token, taskId, updatedTitle, updatedDesc, isComplete);
            setUpdateTaskId(null);
            setUpdatedTitle('');
            setUpdatedDesc('');
            fetchTodos();
            toast.success('Task updated successfully');
        } catch (e) {
            toast.error('An error occurred while updating the task, Please try again.');
        }
    }

    const deleteTodo = async (taskId) => {
        const userId = localStorage.getItem('accountId');
        const token = localStorage.getItem('token');
        try {
            await accessService.delete(userId, token, taskId);
            toast.success('Task deletion is successfull');
            fetchTodos();
        } catch (e) {
            toast.error('Error occurred during deleting task: ${e}');
        }
    }
    return (
        <div>
            <div className='input-component'>
                <input
                    className='component-input'
                    placeholder='Please enter your task'
                    onClick={() => toggleDescriptionInput()}
                />
                <button
                    className='component-button'
                    onClick={addTodo}>
                    ADD
                </button>
                {showDescriptionInput && (
                    <div className='addtaskbox'>
                        <div className='title'>
                            <input className='component-title'
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder='enter the task-title'
                            />
                            <div className='input-description'>
                                <input
                                    className='component-description'
                                    onChange={(e) => setDesc(e.target.value)}
                                    placeholder='enter the task-description'
                                />
                                <button
                                    className='finish-button'
                                    onClick={handleFinishClick}>
                                    Finish
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='task'>
                {todos.filter((todo) => !todo.isComplete).map((todo) => (
                    <div >
                        {updateTaskId === todo.id ? (
                            <div className='edittask-overlay'>
                                <div className='edittask-box'>
                                    <p className='editt'> TITLE: </p>
                                    <input
                                        value={updatedDesc}
                                        onChange={(e) => setUpdatedDesc(e.target.value)}
                                        className='updated-input'
                                    />
                                    <p className='editd'> DESCRIPTION: </p>
                                    <input
                                        value={updatedTitle}
                                        onChange={(e) => setUpdatedTitle(e.target.value)}
                                        className='updated-inputDesc'
                                    />
                                    <div className='Sedittask-button'
                                        onClick={() => save(todo.id, todo.isComplete)}>
                                        SAVE
                                    </div>
                                    <div className='edittask-button'
                                        onClick={() => cancel()}>CANCEL
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='task-box'>
                                <div className='task-title' >
                                    <p>{todo.title}</p>
                                </div >
                                <p className='task-content'>{todo.description} </p>
                                <button
                                    className='task-button1'
                                    onClick={() => complete(todo.id, todo.title, todo.description, !todo.isComplete)}>
                                    Complete<MdDone />
                                </button>
                                <button
                                    className='task-button2'
                                    onClick={() => update(todo.id, todo.title, todo.description)}>
                                    <MdEdit />
                                </button>
                                <button
                                    className='task-button3'
                                    onClick={() => deleteTodo(todo.id)}>
                                    <MdDelete />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <br />
            <br />
            <div className='Inc-task'>
                {todos.filter((todo) => todo.isComplete).map((todo) => (
                    <div className='Inc-task-box'>
                        <p className='etask-title'>{todo.description}</p>
                        <button
                            className='Inc-task-button'
                            onClick={() => complete(todo.id, todo.title, todo.description, !todo.isComplete)}>
                            InComplete<FcSynchronize />
                        </button>
                        <button
                            className='Inc-del-button'
                            onClick={() => deleteTodo(todo.id)}>
                            <MdDelete />
                        </button>
                    </div>
                ))}
            </div>
            <ToastContainer/>
        </div>
    );
};