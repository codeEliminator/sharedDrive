import React from 'react'
import RouteView from '../../../routes/RouteView'
import { UserType } from '@/context/UserContext'
type DriverRoute = {
  activeTrips: Array<{
    userName: string;
    userEmail: string;
    startDate: Date;
    startTime: string;
    startAddress: string;
    endAddress: string;
    selectedRouteIndex: number;
    passengerCount: number;
    userRandomBytes: string;
    done: boolean;
    passengers: Array<string>;
  }>,
  showAlert: (message: string) => void,
  user: UserType | null,
}

const DriverView: React.FC<DriverRoute> = ({activeTrips, showAlert, user}) => {
  return (
    <>
      {
      activeTrips.length === 0 ? ( <>
        <div className='text-xl mt-10'>No Trips found</div>
        <img src="/No-rides.png" alt="" style={{width: '700px', height: '700px'}} />
      </>)
      :
      (
        activeTrips.map((tripItem, idx) => (  
          <>
            <RouteView tripItem={tripItem} key={idx} showAlert={showAlert} ></RouteView>                
          </>
        ))
      )
    }
    </>
  )
}

export default DriverView
