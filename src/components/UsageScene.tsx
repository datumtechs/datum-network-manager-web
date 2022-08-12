import React from 'react'
import { useTranslation } from 'react-i18next'

function UsageScene(props: any) {
  const { status } = props
  const { t } = useTranslation()
  return <>{status == 1 ? t('center.Plaintext') : ''}
    {status == 2 ? t('center.ciphertext') : ''}
    {status == 3 ? <>{t('center.Plaintext')} <br />{t('center.ciphertext')}</> : ''}
  </>
}

export default UsageScene