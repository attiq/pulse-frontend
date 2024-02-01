import dayjs from 'dayjs';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(AdvancedFormat);
// eslint-disable-next-line import/first
import utc from 'dayjs/plugin/utc';
// eslint-disable-next-line import/first
import tz from 'dayjs/plugin/timezone';
// eslint-disable-next-line import/first
import uploadAvatar from '../assets/images/upload_avatar.svg';

export function formateFormErros(formState, formErrors, setFormErrors, reset) {
  if (formState.isSubmitted === true) {
    var updatedFormErrors = [...formErrors];
    if (Object.keys(formState.errors).length > 0) {
      Object.values(formState.errors).map((error) => {
        if (error && !updatedFormErrors.includes(error.message)) {
          updatedFormErrors = [...updatedFormErrors, error.message];
        }
        return updatedFormErrors;
      });
    }
    setFormErrors(updatedFormErrors);
    reset();
  }
}

export function formateAPIErros(apiErrors, formErrors, setFormErrors) {
  var updatedFormErrors = [...formErrors];
  apiErrors.map((error) => {
    if (error && !updatedFormErrors.includes(error)) {
      updatedFormErrors = [...updatedFormErrors, error];
    }
    // eslint-disable-next-line array-callback-return
    return;
  });
  setFormErrors(updatedFormErrors);
  return;
}

export function clearErros(formErrors, setFormErrors, value, error) {
  if (formErrors.length > 0 && value === true) {
    var updatedFormErrors = [...formErrors];
    var index = updatedFormErrors.indexOf(error);
    if (index !== -1) {
      updatedFormErrors.splice(index, 1);
      setFormErrors(updatedFormErrors);
    }
  }
}

export function profileAvatar(avatarUrl) {
  if (!avatarUrl || avatarUrl === '') {
    return 'https://blogs.3ds.com/northamerica/wp-content/uploads/sites/4/2019/08/Robots-Square-300x300.jpg';
  } else {
    return `${process.env.REACT_APP_HOST_URL}${avatarUrl}`;
  }
}

export function getMemberShortName(fullNameArray) {
  if (!fullNameArray?.length) return '';
  return fullNameArray.map((name) => name.charAt(0).toUpperCase()).join('');
}

export function getmembervatarPreview(avatarUrl) {
  if (!avatarUrl || avatarUrl === '') {
    return uploadAvatar;
  }

  return avatarUrl.toLowerCase();
}

export function convertTimeZone(time, time_zone) {
  dayjs.extend(utc);
  dayjs.extend(tz);

  try {
    return dayjs.utc(time).tz(time_zone).format('MMM DD, YYYY hh:mm A');
  } catch {
    return dayjs.utc(time).tz(dayjs.tz.guess()).format('MMM DD, YYYY hh:mm A');
  }
}
