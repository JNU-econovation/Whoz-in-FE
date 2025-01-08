import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography, { typographyClasses } from '@mui/joy/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

export default function DeviceRegisterStepper() {
  // 현재 단계와 완료된 단계를 관리
  const [activeStep, setActiveStep] = React.useState(1); // 예시로 첫 번째 단계만 활성화

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
        '--joy-palette-success-solidBg': 'var(--joy-palette-success-400)',
        [`& .${stepClasses.completed}`]: {
          '&::after': { bgcolor: 'success.solidBg' },
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
            <StepIndicator variant="solid" color="success">
              <CheckRoundedIcon />
            </StepIndicator>
          ) : (
            <StepIndicator>{1}</StepIndicator>
          )
        }
      >
        <div>
          <Typography level="title-sm">Step 1</Typography>
          Device Information
        </div>
      </Step>
      <Step
        completed={activeStep >= 2}
        indicator={
          activeStep >= 2 ? (
            <StepIndicator variant="solid" color="success">
              <CheckRoundedIcon />
            </StepIndicator>
          ) : (
            <StepIndicator>{2}</StepIndicator>
          )
        }
      >
        <div>
          <Typography level="title-sm">Step 2</Typography>
          Network Settings
        </div>
      </Step>
      <Step
        completed={activeStep >= 3}
        active={activeStep === 3}
        indicator={
          activeStep >= 3 ? (
            <StepIndicator variant="solid" color="success">
              <CheckRoundedIcon />
            </StepIndicator>
          ) : (
            <StepIndicator>{3}</StepIndicator>
          )
        }
      >
        <div>
          <Typography level="title-sm">Step 3</Typography>
          Subscription Plan
        </div>
      </Step>
      <Step
        completed={activeStep >= 4}
        indicator={
          activeStep >= 4 ? (
            <StepIndicator variant="solid" color="success">
              <CheckRoundedIcon />
            </StepIndicator>
          ) : (
            <StepIndicator>{4}</StepIndicator>
          )
        }
      >
        <div>
          <Typography level="title-sm">Step 4</Typography>
          Payment Details
        </div>
      </Step>
    </Stepper>
  );
}
