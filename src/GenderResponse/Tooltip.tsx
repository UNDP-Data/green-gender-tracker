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
  z-index: 8;
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
      <h5 className='bold margin-bottom-05 undp-typography'>{data.countryName}</h5>
      <div className='flex-div flex-space-between margin-bottom-05'>
        <div>
          No. of policies
        </div>
        <div className='bold'>
          {data.noOfPolicies}
        </div>
      </div>
      <div className='flex-div flex-space-between margin-bottom-05'>
        <div>
          No. of gender-sensitive policies
        </div>
        <div className='bold'>
          {data.noOfGenderPolicies}
        </div>
      </div>
      <div className='flex-div flex-space-between margin-bottom-05'>
        <div>
          No. of policies addressing violence against women
        </div>
        <div className='bold'>
          {data.noOfPoliciesAddressingVAWG}
        </div>
      </div>
      <div className='flex-div flex-space-between margin-bottom-05'>
        <div>
          No. of policies supporting unpaid care
        </div>
        <div className='bold'>
          {data.noOfPoliciesSupportingUnpaidCare}
        </div>
      </div>
      <div className='flex-div flex-space-between margin-bottom-05'>
        <div>
          No. of policies targeting economic security
        </div>
        <div className='bold'>
          {data.noOfPoliciesTargetingWomenEcoSecurity}
        </div>
      </div>
    </TooltipEl>
  );
};
