export default function InputCard(props) {

    return (
        <>
        <div className='input-card'>
            <input
                className="regular_input"
                type="text"
                placeholder={props.placeholder} 
                id={props.id}
                name={props.name} 
                required
                onChange={(e) => props.onChange(e.target.value)}
                />
        </div>
        </>
    )
}