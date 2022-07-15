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
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const { location } = props;
  const { dataId, metaDataId,
    metaDataName } = location?.state || {};
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

  const submit = (type) => {
    optionList.forEach((_: any) => {
      console.log(_.id, value)
      if (_.id == value) {
        localStorage.setItem('metaDataId', '')
        let url = '/myData/dataVoucherPublishing/CredentialInfo'
        if (type == 'attributed') {
          url = '/myData/dataVoucherPublishing/AttributedPublishing'
        }
        history.push({
          pathname: url,
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


  return <div className='layout-box p-20'>
    <div className='data-voucher-publishing-wrap'>
      {metaDataName ?
        <> <p className="metaInfo-name"><span>{t('center.dataName')}: </span>{metaDataName}</p>
          <p className="metaInfo-id"><span>{t('center.metaDataID')}: </span>{metaDataId}</p>
        </>
        : ''}
      <div className='data-voucher-publishing'>
        <p className='select-ccredential'>{t('voucher.selectTypeCredential')}:</p>
        <div className='data-publishing'>
          <div className="seat-box on-attributed">
            <div className='credentials'>
              <h3 className='credentials-title'>{t('voucher.noAttributedTitle')}</h3>
              <div className={i18n.language == 'zh' ? 'credentials-tip-zh credentials-tips' : 'credentials-tip-en credentials-tips'}>{t('voucher.noAttributedTips')}</div>
              <DebounceSelect
                propsValue={{
                  allowClear: true,
                  value,
                  placeholder: t('credential.pleaseSelectBindCredential'),
                  style: { width: '100%' },
                  onChange: newValue => {
                    setValue(newValue);
                  }
                }}
                fetchOptions={fetchUserList}
              />
              <div className="button" onClick={submit}>{t('common.confirm')}</div>
            </div>
          </div>
          <div className="seat-box attributed">
            <div className='credentials'>
              <h3 className='credentials-title'>{t('voucher.attributedTitle')}</h3>
              <div className={i18n.language == 'zh' ? 'credentials-tip-zh credentials-tips' : 'credentials-tip-en credentials-tips'}>{t('voucher.attributedTips')}</div>
              <DebounceSelect
                key="attributed"
                propsValue={{
                  allowClear: true,
                  value,
                  placeholder: t('credential.pleaseSelectBindCredential'),
                  style: { width: '100%' },
                  onChange: newValue => {
                    setValue(newValue);
                  }
                }}
                fetchOptions={fetchUserList}
              />
              <div className='button-white' onClick={() => submit('attributed')}>{t('common.confirm')}</div>
            </div>
          </div>
        </div>
      </div>
      {dataId ? <div className="button" style={{ marginLeft: 0 }} onClick={() => history.go(-1)}>{t('common.return')}</div> : ''}
    </div>
  </div>
}

export default Details