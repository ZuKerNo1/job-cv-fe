// eslint-disable-next-line no-restricted-imports
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller } from 'react-hook-form';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { FIELD_REQUIRED_MESSAGE } from '../../utils/validators';
import dayjs from 'dayjs';
dayjs.extend(utc);
dayjs.extend(timezone);
const DateTimeInput = ({ control, name, title, value }) => {
  const defaultDateTime = value ? dayjs(value) : dayjs();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DemoItem label={title}>
          <Controller
            name={name}
            control={control}
            rules={{ required: FIELD_REQUIRED_MESSAGE }}
            defaultValue={defaultDateTime}
            render={({ field }) => (
              <DateTimePicker
                {...field}
                defaultValue={field.value ? dayjs(field.value) : defaultDateTime}
                type="date-time"
              />
            )}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DateTimeInput;
