import Button from './Button';
import Dialog from './Dialog';
import Excel from './Excel';
import Form from './Form';
import CRUDStore from '../flux/CRUDStore';
import CRUDActions from '../flux/CRUDActions';
import React, {Component, PropTypes} from 'react';

class Whinepad extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addnew: false,
      count: CRUDStore.getCount(),
    };

    CRUDStore.addListener('change', () => {
      this.setState({
        count: CDATStore.getCount(),
      })
    });
  }

  shouldComponentUpdate(newProps: Object, newState: State): boolean {
    return (
      newState.addnew !== this.state.addnew ||
        newState.count !== this.state.count
    );
  }
  
  _addNewDialog() {
    this.setState({addnew: true});
  }
  
  _addNew(action) {
    this.setState({addnew: false});
    if(action === 'confirm') {
      CRUDActions.create(this.refs.form.getData());
    }
  }
  
  _onExcelDataChange(data) {
    this.setState({data: data});
    this._commitToStorage(data);
  }
  
  _commitToStorage(data) {
    localStorage.setItem('data', JSON.stringify(data));
  }
  
  _doneSearching() {
    this.setState({
      data: this._preSearchData,
    });
  }
  
  render() {
    return (
      <div className="Whinepad">
        <div className="WhinepadToolbar">
          <div className="WhinepadToolbarAdd">
            <Button 
              onClick={this._addNewDialog.bind(this)}
              className="WhinepadToolbarAddButton">
              + add
            </Button>
          </div>
          <div className="WhinepadToolbarSearch">
            <input 
              placeholder={
                `${this.state.count}件から検索...`
              }
              onChange={CRUDActions.search.bind(CRUDActions)}
              onFocus={CRUDActions.startSearching.bind(CRUDActionsthis)}/>
          </div>
        </div>
        <div className="WhinepadDatagrid">
          <Excel />
        </div>
        {this.state.addnew
          ? <Dialog 
              modal={true}
              header="Add new item"
              confirmLabel="Add"
              onAction={this._addNew.bind(this)}
            >
              <Form
                ref="form"
                fields={this.props.schema} />
            </Dialog>
          : null}
      </div>
    );
  }
}

Whinepad.propTypes = {
  schema: PropTypes.arrayOf(
    PropTypes.object
  ),
  initialData: PropTypes.arrayOf(
    PropTypes.object
  ),
};

export default Whinepad