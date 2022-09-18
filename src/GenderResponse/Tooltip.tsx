import styled from 'styled-components';
import { CountrySummaryDataType } from '../Types';

interface Props {
  data: CountrySummaryDataType;
  xPos: number;
  yPos: number;
}

interface TooltipElProps {
  x: number;
  y: number;
  verticalAlignment: string;
  horizontalAlignment: string;
}

const TooltipEl = styled.div<TooltipElProps>`
  display: block;
  position: fixed;
  z-index: 10;
  word-wrap: break-word;
  top: ${(props) => (props.verticalAlignment === 'bottom' ? props.y - 40 : props.y + 40)}px;
  left: ${(props) => (props.horizontalAlignment === 'left' ? props.x - 20 : props.x + 20)}px;
  max-width: 24rem;
  transform: ${(props) => `translate(${props.horizontalAlignment === 'left' ? '-100%' : '0%'},${props.verticalAlignment === 'top' ? '-100%' : '0%'})`};
`;

export const Tooltip = (props: Props) => {
  const {
    data,
    xPos,
    yPos,
  } = props;
  return (
    <TooltipEl className='tooltip' x={xPos} y={yPos} verticalAlignment={yPos > window.innerHeight / 2 ? 'top' : 'bottom'} horizontalAlignment={xPos > window.innerWidth / 2 ? 'left' : 'right'}>
      <h4 className='margin-bottom-07'>{data.countryName}</h4>
      <div className='flex-div flex-space-between margin-bottom-05'>
        <div>
          All Policies
        </div>
        <div className='bold'>
          {data.noOfPolicies}
        </div>
      </div>
      <div className='flex-div flex-space-between margin-bottom-05'>
        <div>
          Gender Related Policies
        </div>
        <div className='bold'>
          {data.noOfGenderPolicies}
        </div>
      </div>
      <div className='flex-div flex-space-between margin-bottom-05'>
        <div>
          Policies adressing voilence againg women
        </div>
        <div className='bold'>
          {data.noOfPoliciesAddressingVAWG}
        </div>
      </div>
      <div className='flex-div flex-space-between margin-bottom-05'>
        <div>
          Policies supporting unpaid care
        </div>
        <div className='bold'>
          {data.noOfPoliciesSupportingUnpaidCare}
        </div>
      </div>
      <div className='flex-div flex-space-between'>
        <div>
          Policies targeting economic security
        </div>
        <div className='bold'>
          {data.noOfPoliciesTargetingWomenEcoSecuirty}
        </div>
      </div>
    </TooltipEl>
  );
};
