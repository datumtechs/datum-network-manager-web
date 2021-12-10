import React from 'react'

export const color = {
  success: '#61ddaa',
  pending: '#5b8ff9',
  running: '#f6bd16',
  failed: '#F24B4B',
}

export const roleColor = {
  sponsor: '#61ddaa',// 任务发起方
  powerProvider: '#f6bd16',// 算力提供方
  dataProvider: '#F24B4B',// 数据提供方
  receiver: '#d08feb',// 结果使用方
  algorithmProvider: '#5b8ff9'// 算法提供方
}

export const ThemeContext = React.createContext({ color, roleColor });