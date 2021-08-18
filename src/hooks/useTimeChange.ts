import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'


const useTimeChange = (millisec: any) => {

  const { t } = useTranslation()

  const seconds = (millisec / 1000).toFixed(1);
  const minutes = (millisec / (1000 * 60)).toFixed(1);
  const hours = (millisec / (1000 * 60 * 60)).toFixed(1);
  const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);
  if (Number(seconds) < 60) {
    return `${seconds} ${t('common.second')}`
    // eslint-disable-next-line no-else-return
  } else if (Number(minutes) < 60) {
    return `${minutes} ${t('common.minute')}`
  } else if (Number(hours) < 24) {
    return `${hours} ${t('common.hour')}`
  } else {
    return `${days} ${t('common.day')}`
  }
}

export default useTimeChange