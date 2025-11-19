import { useSelector } from 'react-redux'
import { BookingForm } from '../components/BookingForm/BookingForm'
import { RootState } from '../store'
import { useForm } from '../hooks/useForm'

export const ConfigStep = () => {
  const form = useSelector((state: RootState) => state.form)
  const { handleFormChange } = useForm()

  return <BookingForm form={form} onChange={handleFormChange} />
}