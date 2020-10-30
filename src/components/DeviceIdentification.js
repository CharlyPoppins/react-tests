import React from 'react'
import Button from 'react-bootstrap/Button'
import { navigate } from '@reach/router'

import du from 'device-uuid'

const DeviceIdentification = () => {
  const deviceUuid = new du.DeviceUUID()

  const uuid = deviceUuid.get()
  const infos = deviceUuid.parse()

  const dua = [
    infos.language,
    infos.platform,
    infos.os,
    infos.cpuCores,
    infos.isAuthoritative,
    infos.silkAccelerated,
    infos.isKindleFire,
    infos.isDesktop,
    infos.isMobile,
    infos.isTablet,
    infos.isWindows,
    infos.isLinux,
    infos.isLinux64,
    infos.isMac,
    infos.isiPad,
    infos.isiPhone,
    infos.isiPod,
    infos.isSmartTV,
    infos.pixelDepth,
    infos.isTouchScreen,
  ]

  const hashMd5 = infos.hashMD5(dua.join(':'))
  const hashInt = infos.hashInt(dua.join(':'))

  return (
    <div>
      <Button className="btn-secondary" onClick={() => navigate(-1)}>
        back
      </Button>
      <p className="my-5 text-center">Device identification</p>
      <p className="my-3 text-center">
        <strong>UUID : </strong>
        {uuid}
      </p>
      <p className="my-3 text-center">
        <strong>Hash MD5 : </strong>
        {hashMd5}
      </p>
      <p className="my-3 text-center">
        <strong>Hash Int : </strong>
        {hashInt}
      </p>
      <p className="my-3">
        <ul>
          {Object.entries(infos).map((array) => {
            return (
              <li>
                <strong>{array[0]} : </strong>
                {JSON.stringify(array[1])}
              </li>
            )
          })}
        </ul>
      </p>
    </div>
  )
}

export default DeviceIdentification
