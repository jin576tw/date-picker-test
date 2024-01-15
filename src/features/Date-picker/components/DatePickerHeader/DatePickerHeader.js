import './DatePickerHeader.scss'
const DatePickerHeader = (props) => {

    return (
        <div className="data-picker-header">
            <button className='header-button' onClick={props.onPrevMonth}>{'<'}</button>
            <div>{props.currentYear}年{props.currentMonth}月</div>
            <button className='header-button' onClick={props.onNextMonth}>{'>'}</button>
        </div>
    )
}

export default DatePickerHeader