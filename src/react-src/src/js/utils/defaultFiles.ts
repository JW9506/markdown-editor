import { FileObject } from '../typings'
const defaultFiles: FileObject[] = [
  {
    id: '1',
    title: 'first post',
    body: 'should be aware of this',
    path: '',
    createdAt: Date.now(),
  },
  {
    id: '2',
    title: 'second post',
    body: 'Dota Wtf',
    path: '',
    createdAt: Date.now(),
  },
  {
    id: '3',
    title: '你好世界',
    body: '你好世界 你好世界',
    path: '',
    createdAt: Date.now(),
  },
]

export default defaultFiles
