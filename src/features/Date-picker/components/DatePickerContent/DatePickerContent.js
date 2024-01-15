import { isEqual } from 'date-fns'
import DateButton from './components/DateButton/DateButton'
import './DatePickerContent.scss'
const DatePickerContent
    = (props) => {

        const handlePickDate = (date) => {
            props.onPickDate(date)
        }

        /** 判斷是否為今日日期 */
        const isToday = (date) => {
            const today = new Date()
            return props.currentYear === today.getFullYear() && props.currentMonth === today.getMonth() + 1 && date.getDate() === today.getDate()
        }

        /** 判斷非當月份 */
        const isNotCurrentMonth = (date) => {
            return props.currentMonth !== date.getMonth() + 1 || props.currentYear !== date.getFullYear()
        }

        /** 判斷已選取 */
        const isPicked = (date) => {
            return props.pickedDates.some((pickedDate) => isEqual(pickedDate,date))
        }


        return (
            <div className='date-picker-content'>
                {
                    props.dates.map((date) => (
                        <DateButton
                            key={date}
                            date={date}
                            disabled={isNotCurrentMonth(date)}
                            today={isToday(date)}
                            picked = {isPicked(date)}
                            onPick={handlePickDate} />
                    ))
                }
            </div>
        )
    }

export default DatePickerContent
