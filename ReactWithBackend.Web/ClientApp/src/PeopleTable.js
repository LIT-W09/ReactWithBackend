import React from 'react';
import PersonRow from './PersonRow';
import axios from 'axios';
import AddPersonForm from './AddPersonForm';


class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        isAdding: false,
        isLoading: true,
        isTableHidden: false
    }

    componentDidMount() {
        axios.get('/api/people/getall').then(res => {
            this.setState({ people: res.data, isLoading: false });
        });
    }

    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }

    onHideTableChange = () => {
        const { isTableHidden } = this.state;
        this.setState({ isTableHidden: !isTableHidden });
    }

    onAddClick = () => {
        this.setState({ isAdding: true });
        axios.post('/api/people/addperson', this.state.person).then(() => {
            this.setState({ isLoading: true });
            axios.get('/api/people/getall').then(res => {
                this.setState({
                    people: res.data,
                    person: {
                        firstName: '',
                        lastName: '',
                        age: ''
                    },
                    isAdding: false,
                    isLoading: false
                });
            });
        });
    }


    generateBody = () => {
        const { isLoading, people } = this.state;
        if (isLoading) {
            return <h1>Loading....</h1>
        }

        return people.map(p => <PersonRow person={p} key={p.id} />);
    }

    render() {
        const { person, isAdding, isTableHidden } = this.state;
        const { firstName, lastName, age } = person;
        return (
            <div className='container mt-5'>
                <AddPersonForm
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                    onTextChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    isAdding={isAdding}
                />
                <div className='row'>
                    <div className='col-md-1'>
                        <input checked={isTableHidden} onChange={this.onHideTableChange} type='checkbox' className='form-control' />
                    </div>
                    <div className='col-md-2'>
                        <span>Hide Table</span>
                    </div>
                    <div className='col-md-2'>
                        <button className='btn btn-primary' onClick={() => this.setState({isTableHidden: true})}>Hide Table</button>
                    </div>
                    <div className='col-md-2'>
                        <button className='btn btn-danger' onClick={() => this.setState({isTableHidden: false})}>Show Table</button>
                    </div>
                </div>
                {!isTableHidden && <table className='table table-hover table-striped table-bordered mt-3'>
                    <thead>
                        <tr>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Age</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateBody()}
                    </tbody>
                </table>
                }
            </div>
        )
    }
}

export default PeopleTable;