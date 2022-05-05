import React from 'react';

export default function AddPersonForm({ firstName, lastName, age, onTextChange, onAddClick, isAdding }) {
    return <div className="row jumbotron">
        <div className="col-md-3">
            <input value={firstName} onChange={onTextChange} name='firstName' type="text" className="form-control" placeholder="First Name" />
        </div>
        <div className="col-md-3">
            <input value={lastName} onChange={onTextChange} name='lastName' type="text" className="form-control" placeholder="Last Name" />
        </div>
        <div className="col-md-3">
            <input value={age} onChange={onTextChange} name='age' type="text" className="form-control" placeholder="Age" />
        </div>
        <div className="col-md-3">
            <button disabled={isAdding} onClick={onAddClick} className='btn btn-primary btn-block'>Add</button>
        </div>
    </div>
}
