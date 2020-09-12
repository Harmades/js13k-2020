// @ts-nocheck
import { Settings } from './settings';

let zzfx, zzfxP, zzfxG, zzfxM, zzfxV, zzfxR, zzfxX
let u = undefined;

// zzfx() - the universal entry point -- returns a AudioBufferSourceNode
zzfx=(...t)=>zzfxP(zzfxG(...t));

// zzfxP() - the sound player -- returns a AudioBufferSourceNode
zzfxP=(...t)=>{let e=zzfxX.createBufferSource(),f=zzfxX.createBuffer(t.length,t[0].length,zzfxR);t.map((d,i)=>f.getChannelData(i).set(d)),e.buffer=f,e.connect(zzfxX.destination),e.start();return e}

// zzfxG() - the sound generator -- returns an array of sample data
zzfxG=(q=1,k=.05,c=220,e=0,t=0,u=.1,r=0,F=1,v=0,z=0,w=0,A=0,l=0,B=0,x=0,G=0,d=0,y=1,m=0,C=0)=>{let b=2*Math.PI,H=v*=500*b/zzfxR**2,I=(0<x?1:-1)*b/4,D=c*=(1+2*k*Math.random()-k)*b/zzfxR,Z=[],g=0,E=0,a=0,n=1,J=0,K=0,f=0,p,h;e=99+zzfxR*e;m*=zzfxR;t*=zzfxR;u*=zzfxR;d*=zzfxR;z*=500*b/zzfxR**3;x*=b/zzfxR;w*=b/zzfxR;A*=zzfxR;l=zzfxR*l|0;for(h=e+m+t+u+d|0;a<h;Z[a++]=f)++K%(100*G|0)||(f=r?1<r?2<r?3<r?Math.sin((g%b)**3):Math.max(Math.min(Math.tan(g),1),-1):1-(2*g/b%2+2)%2:1-4*Math.abs(Math.round(g/b)-g/b):Math.sin(g),f=(l?1-C+C*Math.sin(2*Math.PI*a/l):1)*(0<f?1:-1)*Math.abs(f)**F*q*zzfxV*(a<e?a/e:a<e+m?1-(a-e)/m*(1-y):a<e+m+t?y:a<h-d?(h-a-d)/u*y:0),f=d?f/2+(d>a?0:(a<h-d?1:(h-a)/d)*Z[a-d|0]/2):f),p=(c+=v+=z)*Math.sin(E*x-I),g+=p-p*B*(1-1E9*(Math.sin(a)+1)%2),E+=p-p*B*(1-1E9*(Math.sin(a)**2+1)%2),n&&++n>A&&(c+=w,D+=w,n=0),!l||++J%l||(c=D,v=H,n=n||1);return Z}

// zzfxV - global volume
zzfxV=.3

// zzfxR - global sample rate
zzfxR=44100

// zzfxX - the common audio context
zzfxX=new(top.AudioContext||webkitAudioContext);


zzfxM=(n,f,t,e=125)=>{let l,o,z,r,g,h,x,a,u,c,d,i,m,p,G,M=0,R=[],b=[],j=[],k=0,q=0,s=1,v={},w=zzfxR/e*60>>2;for(;s;k++)R=[s=a=d=m=0],t.map((e,d)=>{for(x=f[e][k]||[0,0,0],s|=!!f[e][k],G=m+(f[e][0].length-2-!a)*w,p=d==t.length-1,o=2,r=m;o<x.length+p;a=++o){for(g=x[o],u=o==x.length+p-1&&p||c!=(x[0]||0)|g|0,z=0;z<w&&a;z++>w-99&&u?i+=(i<1)/99:0)h=(1-i)*R[M++]/2||0,b[r]=(b[r]||0)-h*q+h,j[r]=(j[r++]||0)+h*q+h;g&&(i=g%1,q=x[1]||0,(g|=0)&&(R=v[[c=x[M=0]||0,g]]=v[[c,g]]||(l=[...n[c]],l[2]*=2**((g-12)/12),g>0?zzfxG(...l):[])))}m=G});return[b,j]}

class SoundEffects {
  coin() {

	zzfx(...[.6,u,1300,u,.05,.5,1,2,u,u,1300,.07,u,u,.1,u,u,.9]);
  }


  impact(speed) {
	const norm_speed = ((speed > Settings.maxSpeed ? Settings.maxSpeed : speed) - Settings.minImpactSoundSpeed)/(Settings.maxSpeed - Settings.minImpactSoundSpeed);
	const volume = norm_speed*(Settings.maxSoundImpactVolume - Settings.minSoundImpactVolume) + Settings.minSoundImpactVolume;

	zzfx(...[volume,u,200,u,u,u,u,5,u,-0.1,600,.3,u,8,u,u,u,.9,.1,.01]);
  }

  impact_tree() {

	zzfx(...[.5,u,304,.1,.3,u,5,.1,-46,u,u,u,u,u,-165]);
  }

  impact_foe() {

	zzfx(...[u,u,420,u,.02,.2,4,1.05,-9,u,2e3,.5,u,u,u,.5]);
  }

  impact_boss() {

	zzfx(...[.5,u,304,.1,.3,u,5,.1,-46,u,u,u,u,u,-165]);

	zzfx(...[u,u,418,0,.02,.2,4,1.15,-8.5,u,u,u,u,.7,u,.1]);
  }

  impact_bumper() {

	zzfx(...[u,u,224,.02,.02,.08,1,1.7,-13.9,u,u,u,u,u,6.7]);
  }

  impact_iron() {

	zzfx(...[.4,u,941,u,u,.4,4,.74,-222,u,u,u,u,.8,u,1]);
  }

  launcher() {

	zzfx(...[.7,u,1e3,u,.1,.8,u,u,u,u,100,.01,.03]);
  }

  paddle() {

	zzfx(...[.2,u,537,.02,.02,.22,1,1.59,-6.98,4.97]);

	zzfx(...[.5,u,150,.05,u,.05,u,1.3,u,u,u,u,u,3]);
  }
}

const intro = [[[.5,0,143,u,.1,.5,3],[1.6,0,4e3,u,u,.05,2,1.25,u,u,u,u,.02,6.8,-.3,u,.5],[.6,0,23,u,u,.13,3,5]],[[[u,u,13,u,u,u,13,u,13,u,u,u,u,u,u,u,u,u,13,u,u,u,13,u,13,u,u,u,6,u,10,u,12,u,13,u,u,u,13,u,13,u,u,u,u,u,u,u,u,u,8,u,u,u,8,u,8,u,u,u,u,u,u,u,u,u,u],[u,u,17,u,u,u,17,u,17,u,u,u,u,u,u,u,u,u,17,u,u,u,17,u,17,u,u,u,u,u,u,u,u,u,17,u,u,u,17,u,17,u,u,u,u,u,u,u,u,u,12,u,u,u,12,u,12,u,u,u,u,u,u,u,u,u,u],[u,u,22,u,u,u,22,u,22,u,u,u,u,u,u,u,u,u,22,u,u,u,22,u,22,u,u,u,u,u,u,u,u,u,22,u,u,u,22,u,22,u,u,u,u,u,u,u,u,u,17,u,u,u,17,u,17,u,u,u,u,u,u,u,u,u,u],[1,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u]],[[u,u,13,u,u,u,13,u,13,u,u,u,u,u,u,u,u,u,13,u,u,u,13,u,13,u,u,u,6,u,10,u,12,u,13,u,u,u,13,u,13,u,u,u,u,u,u,u,u,u,8,u,u,u,8,u,8,u,u,u,u,u,u,u,u,u,u],[u,u,17,u,u,u,17,u,17,u,u,u,u,u,u,u,u,u,17,u,u,u,17,u,17,u,u,u,u,u,u,u,u,u,17,u,u,u,17,u,17,u,u,u,u,u,u,u,u,u,12,u,u,u,12,u,12,u,u,u,u,u,u,u,u,u,u],[u,u,22,u,u,u,22,u,22,u,u,u,u,u,u,u,u,u,22,u,u,u,22,u,22,u,u,u,u,u,u,u,u,u,22,u,u,u,22,u,22,u,u,u,u,u,u,u,u,u,17,u,u,u,17,u,17,u,u,u,u,u,u,u,u,u,u],[1,u,u,u,u,u,u,u,u,u,13,13,u,13,u,u,13,u,u,u,u,u,u,u,u,u,13,u,13,u,13,u,13,u,u,u,u,u,u,u,u,u,u,u,13,u,u,u,13,u,u,u,u,u,u,u,u,u,13,13,u,13,13,u,13,13]],[[u,u,13,u,u,u,13,u,13,u,u,u,u,u,u,u,u,u,13,u,u,u,13,u,13,u,u,u,6,u,10,u,12,u,13,u,u,u,13,u,13,u,u,u,u,u,10,u,u,u,8,u,u,u,8,u,8,u,u,u,u,u,u,u,u,u,u],[u,u,17,u,u,u,17,u,17,u,u,u,u,u,u,u,u,u,17,u,u,u,17,u,17,u,u,u,u,u,u,u,u,u,17,u,u,u,17,u,17,u,u,u,u,u,13,u,u,u,12,u,u,u,12,u,12,u,u,u,u,u,u,u,u,u,u],[u,u,22,u,u,u,22,u,22,u,u,u,5,u,10,u,12,u,22,u,u,u,22,u,22,u,u,u,12,u,10,u,5,u,22,u,u,u,22,u,22,u,u,u,u,u,18,u,u,u,17,u,u,u,17,u,6,u,u,u,u,u,u,u,u,u,u],[1,u,u,u,u,u,u,u,u,u,13,13,u,13,u,u,13,u,u,u,u,u,u,u,u,u,13,u,13,u,13,u,13,u,u,u,u,u,u,u,u,u,u,u,13,u,u,u,13,u,u,u,u,u,u,u,u,u,13,13,u,13,13,u,13,13],[2,u,13,17,13,17,13,20,13,20,u,u,u,u,u,u,u,u,13,17,13,17,13,12,13,12,u,u,u,u,u,u,u,u,13,17,13,17,13,12,13,12,u,u,u,u,u,u,u,u,13,17,13,17,13,10,13,10,u,u,u,u,13,20,15,15]],[[u,u,13,u,u,u,13,u,13,u,u,u,12,u,10,u,5,u,13,u,u,u,13,u,13,u,u,u,6,u,10,u,12,u,13,u,u,u,13,u,13,u,u,u,u,u,10,u,u,u,8,u,u,u,8,u,8,u,u,u,u,u,13,u,u,u,u],[u,u,17,u,u,u,17,u,17,u,u,u,u,u,u,u,u,u,17,u,u,u,17,u,17,u,u,u,u,u,u,u,u,u,17,u,u,u,17,u,17,u,u,u,u,u,13,u,u,u,12,u,u,u,12,u,12,u,u,u,u,u,u,u,u,u,u],[u,u,22,u,u,u,22,u,22,u,u,u,5,u,10,u,12,u,22,u,u,u,22,u,22,u,u,u,12,u,12,u,5,u,22,u,u,u,22,u,22,u,u,u,u,u,18,u,u,u,17,u,u,u,17,u,6,u,u,u,u,u,u,u,u,u,u],[1,u,u,u,u,u,u,u,u,u,13,13,u,13,u,u,13,u,u,u,u,u,u,u,u,u,13,u,13,u,13,u,13,u,u,u,u,u,u,u,u,u,u,u,13,u,u,u,13,u,u,u,u,u,u,u,u,u,13,13,u,13,13,u,13,13],[2,u,13,17,13,17,13,20,13,20,u,u,u,u,u,u,u,u,13,17,13,17,13,12,13,12,u,u,u,u,u,u,u,u,13,17,13,17,13,12,13,12,u,u,u,u,u,u,u,u,13,17,13,17,13,10,13,10,u,u,u,u,13,20,15,15]]],[0,1,2,3,2,3,2,3,2,3,2,3],u,u];

const pone = [[[u,0,80,u,.1,.6,2,u,u,u,u,u,u,u,u,.02,.01],[.3,0,80,u,.08,.18,3],[.7,0,22,u,.07,.07,2,0,u,u,.5,.01]],[[[u,u,15,u,18,u,u,u,15,u,18,u,u,u,15,u,18,u,u,u,u,u,10,u,13,u,u,u,10,u,13,u,u,u,10,u,13,u,u,u,u,u,15,u,18,u,u,u,15,u,18,u,u,u,20,u,18,u,u,u,u,u,10,u,13,u,u,u,u,u,13,u,u,u,u,u,u,u,u],[1,u,15,18,22,25,15,18,22,25,15,18,22,25,15,18,22,25,15,18,22,25,10,13,17,20,10,13,17,20,10,13,17,20,10,13,17,20,10,13,17,20,15,18,22,25,15,18,22,27,15,18,22,25,20,24,27,30,15,18,22,25,10,17,24,29,10,13,17,20,10,17,24,30,30,27,24,22]]],[0],140,u];

const ptwo = [[[1.5,0,43,u,u,.25,u,u,u,u,u,u,u,2],[.5,0,2100,u,u,.2,3,3,u,u,-400,u,u,2],[.7,0,23,u,u,.2,3,5]],[[[u,u,20,u,u,u,20,u,20,u,u,u,20,u,20,u,u,u,20,u,u,u,20,u,20,u,u,u,20,u,20,u,u,u,20,u,u,u,20,u,20,u,u,u,20,u,20,u,u,u,20,u,u,u,20,u,20,u,u,u,20,u,20,u,u,u,u],[1,u,20,u,u,u,20,u,20,u,u,u,20,u,20,u,u,u,20,u,u,u,20,u,20,u,u,u,20,u,20,u,u,u,20,u,u,u,20,u,20,u,u,u,20,u,20,u,u,u,20,u,u,u,20,u,20,u,u,u,20,u,20,u,u,u,u],[2,u,13,u,13,u,13,u,13,u,13,u,13,u,13,u,16,u,13,u,13,u,13,u,13,u,13,u,13,u,13,u,16,u,13,u,13,u,13,u,13,u,13,u,13,u,13,u,16,u,13,u,13,u,13,u,13,u,13,u,16,u,18,u,19,u,u],[u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u]]],[0],120,u];

const pthree = [[[.5,0,80,u,.07,.07,2,0,u,u,.5,.01],[2,0,43,u,u,.25,u,u,u,u,u,u,u,2],[1.5,0,4e3,u,u,.03,2,1.25,u,u,u,u,.02,6.8,-.3,u,.5],[.5,0,80,u,.5,.35,3]],[[[u,u,8,u,9,u,13,u,12,u,8,u,9,u,6,u,u,u,8,u,9,u,13,u,12,u,8,u,9,u,14,u,u,u,8,u,9,u,13,u,12,u,8,u,9,u,6,u,u,u,8,u,9,u,13,u,12,u,8,u,9,u,14,u,u,u,u],[1,u,13,u,u,u,u,u,u,u,13,u,u,u,u,u,u,u,13,u,u,u,u,u,u,u,13,u,u,u,u,u,u,u,13,u,u,u,u,u,u,u,13,u,u,u,u,u,u,u,13,u,u,u,u,u,u,u,13,u,u,u,u,u,u,u,u],[2,u,u,u,u,u,13,u,13,u,u,u,u,u,13,u,13,u,u,u,u,u,13,u,13,u,u,u,u,u,13,u,13,u,u,u,u,u,13,u,u,u,u,u,u,u,13,u,13,u,u,u,u,u,13,u,13,u,u,u,u,u,13,u,u,u,u],[3,u,20,u,u,u,u,u,u,u,u,u,u,u,20,u,u,-1,19,u,u,u,u,u,u,u,u,u,u,u,8,u,u,u,13,u,u,u,u,u,u,u,u,u,u,u,25,u,u,-1,8,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u],[3,u,13,u,u,u,u,u,u,u,u,u,u,u,13,u,u,-1,8,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,20,u,u,u,u,u,u,u,u,u,u,u,20,u,u,-1,19,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u,u]]],[0],140,u];


const win_one = [[[.7,0,50,.002,.02,.08,3,u,u,u,u,u,u,u,u,.1,.01],[.3,0,196,u,.08,.5,3]],[[[u,u,13,u,17,u,18,u,22,u,23,u,28],[1,u,13,u,17,u,18,u,22,u,23,u,28]]],[0],180];

const win_vf = [[[.5,0,190,u,.08,.5,3],[u,0,48,u,u,.2,3,5]],[[[u,u,5,u,5,u,5,u,5,u,u,u,u,u,1,u,u,u,u,u,3,u,u,u,u,u,5,u,u,u,3,u,5],[1,u,5,u,5,u,5,u,5,u,u,u,u,u,1,u,u,u,u,u,3,u,u,u,u,u,5,u,u,u,3,u,5]]],[0],209,u];

class SoundSongs {
  is_playing: boolean;
  intro: any;
  pone: any;
  ptwo: any;
  pthree: any;
  win_one: any;
  win_vf: any;
  audio_node: any;

  constructor() {
	this.is_playing = false;

	this.intro = zzfxM(...intro);

	this.pone = zzfxM(...pone);

	this.ptwo = zzfxM(...ptwo);

	this.pthree = zzfxM(...pthree);

	this.win_one = zzfxM(...win_one);

	this.win_vf = zzfxM(...win_vf);
  }

  play_intro() {

	this.audio_node = zzfxP(...this.intro);
	this.audio_node.loop = true;
  }

  play_pone() {

	this.audio_node = zzfxP(...this.pone);
	this.audio_node.loop = true;
  }

  play_ptwo() {

	this.audio_node = zzfxP(...this.ptwo);
	this.audio_node.loop = true;
  }

  play_pthree() {

	this.audio_node = zzfxP(...this.pthree);
	this.audio_node.loop = true;
  }

  play_win() {

	this.audio_node = zzfxP(...this.win_one);
  }

  play_win_vf() {

	this.audio_node = zzfxP(...this.win_vf);
  }

  stop_song() {
	if(this.audio_node) {
	  this.audio_node.stop();
	}
  }


  set_sound_level(level) {
	zzfxV = level;
  }}


export const Songs = new SoundSongs()
export const Effects = new SoundEffects()
