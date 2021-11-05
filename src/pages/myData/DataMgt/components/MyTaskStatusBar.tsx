
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MyTag from '../../../../components/MyTag'

const MyTaskStatusBar: FC<any> = (props: any) => {
  const { status, role, width, margin } = props
  const { t, i18n } = useTranslation()
  const [color, colorSet] = useState<string>('')
  const [bgColor, bgColorSet] = useState<string>('')
  const [content, contentSet] = useState<string>('')
  const [border, borderSet] = useState<string>('')
  useEffect(() => {
    if (status === 4) {
      colorSet('#52C41A')
      bgColorSet('#EBFDDA')
      contentSet(t('task.success'))
      borderSet('#B7EB8F')
    } else if (status === 3) {
      colorSet('#F5222D')
      bgColorSet('#F9DDDB')
      contentSet(t('task.failed'))
      borderSet('#FFA39E')
    } else if (status === 1) {
      colorSet('#1A6FC4')
      bgColorSet('#DAE6FD')
      contentSet(t('task.pending'))
      borderSet('#8FBDEB')
    } else if (status === 2) {
      colorSet('#781AC4')
      bgColorSet('#F3DAFD')
      contentSet(t('task.computing'))
      borderSet('#D08FEB')
    }
  }, [status])

  useEffect(() => {
    if (role === 'taskSponsor' || role === 1) { // 发起方
      colorSet('#52C41A')
      bgColorSet('#EBFDDA')
      contentSet(t('computeNodeMgt.sponsor'))
      borderSet('#B7EB8F')
    } else if (role === 'dataProvider' || role === 2) { // 数据提供者
      colorSet('#F5222D')
      bgColorSet('#F9DDDB')
      contentSet(t('computeNodeMgt.dataSupplier'))
      borderSet('#FFA39E')
    } else if (role === 'algoProvider' || role === 5) { // algoProvider 算法提供
      colorSet('#1A6FC4')
      bgColorSet('#DAE6FD')
      contentSet(t('computeNodeMgt.algoSupplier'))
      borderSet('#8FBDEB')
    } else if (role === 'resultConsumer' || role === 4) { // resultConsumer 使用方
      colorSet('#781AC4')
      bgColorSet('#F3DAFD')
      contentSet(t('computeNodeMgt.receiver'))
      borderSet('#D08FEB')
    } else if (role === 'powerProvider' || role === 3) { // powerProvider 算力提供方
      colorSet('#FAAD14')
      bgColorSet('#FDFCDA')
      contentSet(t('computeNodeMgt.powerSupplier'))
      borderSet('#FFDA06')
    }
  }, [role, i18n.language])

  return <MyTag content={content} radius='2' color={color} bgColor={bgColor} width={width} border={border} margin={margin}></MyTag>

}

export default MyTaskStatusBar