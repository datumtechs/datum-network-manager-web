import React from 'react'

export const color = {
  pending: '#657ACD',
  running: '#F2DB01',
  failed: '#f53b72',
  success: '#3fbf0080',
}

export const roleColor = {
  sponsor: '#3fbf0080',// 任务发起方
  powerProvider: '#F2DB01',// 算力提供方
  dataProvider: '#f53b72',// 数据提供方
  receiver: '#d08feb',// 结果使用方
  algorithmProvider: '#657ACD'// 算法提供方
}

export const ThemeContext = React.createContext({ color, roleColor });