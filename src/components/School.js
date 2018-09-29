import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSchool } from '../store';

class School extends Component {
  constructor({ school }) {
    super();

    this.state = {
      name: school ? school.name : '',
      address: school ? school.address : '',
      description: school ? school.description : '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.school && this.props.school) {
      this.setState({
        name: this.props.school.name,
        address: this.props.school.address,
        description: this.props.school.description,
      });
    }
  }
  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  onSave(evt) {
    evt.preventDefault();
    this.props.updateSchool({
      id: this.props.school.id,
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
    });
    this.props.history.push('/schools');
  }

  render() {
    if (!this.props.school) {
      return null;
    }
    const { name, address, description } = this.state;
    const { onChange, onSave } = this;
    const empty = !name || !address || !description;
    const changed =
      this.props.school.name !== name ||
      this.props.school.address !== address ||
      this.props.school.description !== description;
    return (
      <div>
        <h3>{name}</h3>
        <div>
          <form onSubmit={onSave}>
            <div>
              <div>
                <label>Name:</label>
                <input id="name" name="name" value={name} onChange={onChange} />
              </div>
              <div>
                <label>Address:</label>
                <input
                  id="address"
                  name="address"
                  value={address}
                  onChange={onChange}
                />
              </div>
              <div>
                <label>Description:</label>
                <input
                  id="description"
                  name="description"
                  value={description}
                  onChange={onChange}
                />
              </div>
              <button disabled={empty || !changed}>Update</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ schools }, { match, history }) => {
  const school = schools.find(school => school.id === match.params.id * 1);
  return {
    school,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateSchool: school => dispatch(updateSchool(school)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(School);
