function AddTodo(props){
    const {handleAddTodo} = props
    return (
        <>
        <div className="d-flex justify-content-center mt-5 mb-3">
            <div className="row">
                <div className="col-auto">
                    <input type="text" className="form-control" placeholder="Add todo" id='input-todo'/>
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary" onClick={handleAddTodo}>Add</button>
                </div>
            </div>
        </div> 
        </>
    )
}

export default AddTodo;