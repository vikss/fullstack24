
const PersonForm = (props)=>{
    let handleForm = props.handleForm

    return (<form onSubmit={handleForm}>
    <h2>add a new</h2>
    <FormField name="name" value={props.name} handleAdd={props.handleNameAdd}></FormField>
    <FormField name="number" value={props.number} handleAdd={props.handleNumberAdd}></FormField>
    
    <div>
      <button type="submit">add</button>
    </div>
  </form>)
}
const FormField = (props)=>{
return <div>{props.name}: <input value={props.value} onChange={props.handleAdd}></input></div>

}


export default PersonForm;