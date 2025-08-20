import $style from './index.module.scss'
import { useNavigate, createSearchParams } from 'react-router'
import { useEffect } from 'react'
import { fetchUserInfo } from '@/redux/userInfoSlice'
import { useAppDispatch, useAppSelector } from '@/hooks'

export function Header() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userInfo = useAppSelector((state) => state.userInfo.userInfo)

  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  function handleBack() {
    navigate(-1)
  }

  function handleAbout() {
    console.log('handleAbout')

    navigate({
      pathname: '/about/1',
      search: createSearchParams({
        id: '123',
      }).toString(),
    })
  }

  return (
    <>
      <div className={$style['header-container']}>
        <div className="back-btn">
          <button onClick={handleBack}>返回</button>
        </div>
        <div className="info-wrapper">
          <button onClick={handleAbout}>关于</button>
          <div className="user-info">
            <p>用户名: {userInfo.userName}</p>
            <p>年龄: {userInfo.age}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
