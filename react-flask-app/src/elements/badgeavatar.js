import React,{useState,useEffect} from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FELIZ from "../static/FELIZ.png";
/*import ASUSTADO from "../static/ASUSTADO.png";*/
import ATERRADO from "../static/ATERRADO.png";
import DISGUSTADO from "../static/DISGUSTADO.png";
import MOLESTO from "../static/MOLESTO.png";
import NEUTRAL from "../static/NEUTRAL.png";
import SORPRENDIDO from "../static/SORPRENDIDO.png";
import TRISTE from "../static/TRISTE.png";
/*
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);*/

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function BadgeAvatar() {
  const classes = useStyles();
  const [src, setSrc] = useState("")

  useEffect(() => {
  const feelingStr = localStorage.getItem("feeling")
  const feeling = JSON.parse(feelingStr)
  
  switch(feeling){
    case 'feliz':
      setSrc(FELIZ)
      break;
    case 'triste':
      setSrc(TRISTE)
      break;
    case 'disgustado':
      setSrc(DISGUSTADO)
      break;
    case 'molesto':
      setSrc(MOLESTO)
      break;
    case 'aterrado':
      setSrc(ATERRADO)
      break;
    case 'neutral':
      setSrc(NEUTRAL)
      break;
    case 'sorprendido':
      setSrc(SORPRENDIDO)
      break;
    default:
      break;
  }},[]);

  return (
    <div className={classes.root}>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={<SmallAvatar src={src} />}
      >
        <Avatar src="https://scontent.flim11-1.fna.fbcdn.net/v/t1.0-9/130249199_4085934954754163_3099918067762144354_n.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeHQfj-ySbhveZyUGvRhOKopRs1cdnmMOm9GzVx2eYw6b2-aJ_wuroadDOfGAB7a8Pff-r76GyKzGMExSxFU20jR&_nc_ohc=MXzxM-zn6IAAX8-bXQn&_nc_ht=scontent.flim11-1.fna&oh=1f9a0965813770f603b008be42eeb9ba&oe=602CCDBE" />
      </Badge>
    </div>
  );
}