import { FC, useEffect, useLayoutEffect, useState } from 'react'
import { Select } from 'antd';
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { voucher } from '@api'
import "./scss/styles.scss"
import { DebounceSelect } from './components/DebounceSelect'

interface UserValue {
  label: string;
  value: string;
}

const Details: FC<any> = (props: any) => {
  const { t } = useTranslation();
    const history = useHistory();
    const { location } = props;
    const { dataId } = location?.state || {};
    const [value, setValue] = useState(dataId || null);
    const [optionList, setOptionList] = useState([])


  const fetchUserList = async (keyword: string): Promise<UserValue[]> => {
    return voucher.queryMetaDataByKeyword({ keyword }).then(res => {
      const { data, status } = res
      if (status == 0) {
        setOptionList(data)
        return data.map(item => ({
          label: item.metaDataName,
          value: item.id,
        }))
      }
      return []
    })
  }

  const submit = () => {
    // history.push({
    //   pathname: '/myData/dataVoucherPublishing/CredentialInfo',
    //   state: {
    //     // dataTokenId: _.dataTokenId,
    //     metaDataId: 'metadata:0x5cf98cbaf613b8d526ffec288689e26020d5dc35364ef31fb16c5b84a3e8d5bb',
    //     // metaDataName: _.metaDataName,
    //     dataId: 3,
    //   }
    // })
    optionList.forEach((_: any) => {
      console.log(_.id, value)
      if (_.id == value) {
        localStorage.setItem('metaDataId', '')
        history.push({
          pathname: '/myData/dataVoucherPublishing/CredentialInfo',
          state: {
            dataTokenId: _.dataTokenId,
            metaDataId: _.metaDataId,
            metaDataName: _.metaDataName,
            dataId: _.id,
          }
        })
      }
    })
  }


  return <div className='layout-box'>
    <div className='data-table-box data-voucher-publishing-wrap'>
      <div className='data-voucher-publishing'>
        <p className='select-ccredential'>{t('voucher.selectTypeCredential')}:</p>
        <div className='data-publishing'>
          <div className='on-attributed  credentials'>
            <h3 className='credentials-title'>{t('voucher.noAttributedTitle')}</h3>
            <div className='credentials-tips'>{t('voucher.noAttributedTips')}</div>
            <DebounceSelect
              propsValue={{
                allowClear: true,
                value,
                placeholder: t('voucher.selectCredential'),
                style: { width: '100%' },
                onChange: newValue => {
                  setValue(newValue);
                }
              }}
              fetchOptions={fetchUserList}
            />
            <div className="button" onClick={submit}>{t('common.select')}</div>
          </div>
          <div className='attributed credentials'>
            <h3 className='credentials-title'>{t('voucher.attributedTitle')}</h3>
            <div className='credentials-tips'>{t('voucher.attributedTips')}</div>
            <Select disabled={true} style={{ width: '100%' }} />
            <div className='button-white'>{t('common.comingSoon')}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Details