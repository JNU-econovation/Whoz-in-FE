import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography, { typographyClasses } from '@mui/joy/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

export default function BetaDeviceRegisterStepper() {
  // 현재 단계와 완료된 단계를 관리
  const [activeStep, setActiveStep] = React.useState(2); 

  return (
    <Stepper
      orientation="vertical"
      sx={(theme) => ({
        '--Stepper-verticalGap': '2.5rem',
        '--StepIndicator-size': '2.5rem',
        '--Step-gap': '1rem',
        '--Step-connectorInset': '0.5rem',
        '--Step-connectorRadius': '1rem',
        '--Step-connectorThickness': '4px',
        [`& .${stepClasses.completed}`]: {
          '&::after': { bgcolor: '#1976D2' }, // 완료된 상태의 배경색
        },
        [`& .${stepClasses.active}`]: {
          [`& .${stepIndicatorClasses.root}`]: {
            border: '4px solid', 
            borderColor: '#fff',
            boxShadow: `0 0 0 1px ${theme.vars.palette.primary[500]}`,
          },
        },
        [`& .${stepClasses.disabled} *`]: {
          color: 'neutral.softDisabledColor',
        },
        [`& .${typographyClasses['title-sm']}`]: {
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontSize: '10px',
        },
      })}
    >
      <Step
        completed={activeStep >= 1}
        indicator={
          activeStep >= 1 ? (
            <StepIndicator variant="solid" sx={{ bgcolor: '#1976D2' }}>
              <CheckRoundedIcon sx={{ color: '#fff' }} />
            </StepIndicator>
          ) : (
            <StepIndicator>{1}</StepIndicator>
          )
        }
      >
        <div>
          <Typography level="title-sm">Step 1</Typography>
          {activeStep > 1
            ? '{Wifi1}에 연결 완료'
            : '첫 번째 Wi-Fi에 연결합니다.'}
        </div>
      </Step>
      <Step
        completed={activeStep >= 2}
        indicator={
          activeStep >= 2 ? (
            <StepIndicator variant="solid" sx={{ bgcolor: '#1976D2' }}>
              <CheckRoundedIcon sx={{ color: '#fff' }} />
            </StepIndicator>
          ) : (
            <StepIndicator>{2}</StepIndicator>
          )
        }
      >
        <div>
          <Typography level="title-sm">Step 2</Typography>
          {activeStep > 2
            ? '{WIFI2}에 연결 완료'
            : activeStep === 2
            ? '두 번째 와이파이에 연결 중입니다.'
            : '두 번째 와이파이 연결'}
        </div>
      </Step>
      <Step
        completed={activeStep >= 3}
        active={activeStep === 3}
        indicator={
          activeStep >= 3 ? (
            <StepIndicator variant="solid" sx={{ bgcolor: '#1976D2' }}>
              <CheckRoundedIcon sx={{ color: '#fff' }} />
            </StepIndicator>
          ) : (
            <StepIndicator>{3}</StepIndicator>
          )
        }
      >
        <div>
          <Typography level="title-sm">Step 3</Typography>
          {activeStep > 3
            ? '{Wifi3}에 연결 완료'
            : activeStep === 3
            ? '세 번째 와이파이에 연결 중입니다.'
            : '세 번째 와이파이 연결'}
        </div>
      </Step>
      <Step
        completed={activeStep >= 4}
        indicator={
          activeStep >= 4 ? (
            <StepIndicator variant="solid" sx={{ bgcolor: '#1976D2' }}>
              <CheckRoundedIcon sx={{ color: '#fff' }} />
            </StepIndicator>
          ) : (
            <StepIndicator>{4}</StepIndicator>
          )
        }
      >
        <div>
          <Typography level="title-sm">Step 4</Typography>
          기기등록 완료
        </div>
      </Step>
    </Stepper>
  );
}
