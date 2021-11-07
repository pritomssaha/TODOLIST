import { useContext, useState   } from "react";
import { Table, Button, Form } from 'react-bootstrap'

import { TodosContext } from "./App";

export default function ToDoList(){
    const {state, dispatch} = useContext(TodosContext);
    const [todoText, setTodoText] = useState("") 
    const [editMode, setEditMode] = useState(false) 
    const [editTodo, setEditTodo] = useState(null) 
    const buttonTitle = editMode ? "Edit" : "Add";

    

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(editTodo)
        if(editMode){
            dispatch({type:"edit", payload:{...editTodo, text: todoText}})
            setEditMode(false);
            setEditTodo(null)
        }
        else{
            if(todoText!=="")
                dispatch({type:"add", payload: todoText})
            else
                console.log("Nothing to add")
        }
        setTodoText("")
    }

    return(
        <div>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control 
                    type="text" 
                    placeholder="Enter To Do"
                    onChange={e=>setTodoText(e.target.value)}
                    value={todoText} />
            </Form.Group>

            <Button variant="primary" type="submit">
                {buttonTitle}
            </Button> 

            </Form>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>To Do</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {state.todos.map(todo =>(
                        <tr key={todo.id}>
                            <td>{todo.text}</td>
                            <td onClick={()=>{
                                console.log(todo)
                                setTodoText(todo.text)
                                setEditMode(true)
                                setEditTodo(todo)
                            }
                            }>Edit</td>
                            <td onClick={()=>dispatch({type:"delete", payload:todo.id})}>Delete</td>
                        </tr>
                    ))} 
                </tbody>
        </Table> 
        </div>
        )
        ;
}