import React from 'react';


function PersonRow({ person }) {
    const { firstName, lastName, age } = person;
    return (
        <tr>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
        </tr>
    )
}

export default PersonRow;