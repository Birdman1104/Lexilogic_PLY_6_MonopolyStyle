import { lego } from '@armathai/lego';
import { Howl } from 'howler';

import { KeyboardEvents } from './events/MainEvents';
import { GameModelEvents } from './events/ModelEvents';

const click =
    'data:audio/mpeg;base64,SUQzAwAAAAAAFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/84RwABHdsz7KpiwAgKgCXK1AAACVWbvrvym39gkCQWE4EBEiXvpBIJkIAgHES9f9KaOwdho0lh7ATEGPAAYBY/qGhoaU80OSbrlAeB0NHYOgdho03HeT7Nzc3P2xjJQNGM5e/3ve/2Me/j3vve/hjKeaGlTwxmxnL7/////+X7Dc/cMrm/74YyWM/2VLGVve/h97Pe/e+////l/vffDGVJoIj///4LQEsQAACWAAAMKENDMwACbZppxuyW3W8+3/84RwDwewH5lvwwADDTgzMgWCAQbOLNtETVkz0//Mpmd13Ide36zvXs3MzuLzhRynbyze38Pgh/LHpU7S3//9oNf5vaBoAEkElNNpwOOUXjeEgaidxRQ/OZ7V+liJV2ZZY36myP/qnVd//lk//yTCPuceZ//5UqKgqaYCpNyW7/YmayyVQAR13XddxbriNLVVOfcn7vR7ehnlb1Z2gRSO5Cxj/WRQb7yomepgs4q6welvoqCrVLtZPa/+S0bpKbb/84RwRwhYH3Uf5gABCigm+gXDAALtt25mq7BgwpRcBipbYSpsq/2Qh6lP7dX6/RoUW+5v9P2yrsRAwAL9OW8vkVU1WUaJc5KpNHANTnO1L5ir4MAgrf2bWeRSSUkcOSatlfl60Nyl2T6obKVlb/e5i2+39zBW09XWVctR4BIpyrdXdwn0+IntFTr7csFKWNZFeCUTtVx3gK4PhjjIcNlNwCQMSnEIPq19tSjAtSKA0PAFglcRLihL5Wwko838nu//84Rwhgro71C3JMJbDfCyqewRhmyBtbv8ixR5X46VVVqqblvqXSbZNoiEBQJg6kIFk8XLnI2NzuxrS5W2V9hKAoAydVHoW7kcLHCoKnV9yTsRC9ey8X/TBXpT2i3rb1mfU7/vfh2tlDN9NHT9MKJJSSbiI7OCe1oLJPEp5VVDFPCwgmFMl9nUtKT4CtrfgW7Q9GYkMlGFpECqtqG1pa1v0P5hHmgMJHgpwWLId8VAlUFqu3bszzPHRkCQDjsnEED/84Rwognsb0jLJYY3EDlSjghJhpDqmqYmKkIBh6mgFHURVyHExSxqGEkia8ZigVALGlHMUcqC0WvKqpS018iqyVaxcFHEsgRDn9J0FYlsOqErvWGv1hUtuEXqAuInyLNciqRlsQket2V9e+R5USk2rGTW4yTQxIQyoaERoKhLLBQnGAR4BhI2EljoZwQgBdNWV0iJtKkoiFIpJVia81WUkQD/////////////////////////////////////////84RwvA0IpS7LMShIDTjmYXRJkmz/////////////////////////////////////////////////////////////////////////////////////////////////////////////7uAAAAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////84RQyQ3wAS4AAAAAAVACXPQAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/84RQ/xUAAS4AAAAAAKgCXKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';

const correct =
    'data:audio/mpeg;base64,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2Jk2DIIIuA//84Rwxw91yUcvIpRtBRBaMXgCEign2////////v7qCYQ4tXqXUo+BiwBrNPZv/7TBv1qXRLhuNgAUECpYrES2////RolpFv/96kSOAECAoTTOhFbg7w7gGIAf8Bfok9HEAFsyHHANxWoh98BB/9MSAn/////////zBSv9SjYnkX///+z/2oKL8CFAottoARIFskBG//tzZ4VhE0zo/jsALQL4N6ASqkCBqMAODk8iqo0Nh9APPCNFqWpqjpQI8Cj/84Rw4g69w00vPpRtjaKaopQpZLaIDSEyAGaCDs/////////jlDw//ScLMvT///6//0lkYEiIGjBEkVzVD////ubpK//9SZHARNE6T6lADt7tCfocAKF/Uw9lV0aBVAjv57B5b1VidEP/SMQIcBOGgLbtsAGQBtbgWa/YwSdIzWXEElDhHwJPWEgAeqZEWBg8ttpGSJRAJGkFSLqSOkiTRiFqgGK5JN////////q17DPjES/9IKGJJaupVX///+7/84Rw4A3Rwz8vLpRtiHjSmpQQ2myRiQIJbAUgQEqmav///9TlorLf//TQNhZoHWIIyDHEUNDMwSR///////////////////////////////////////////////+CrRFDAAJLa0gdjbsGEBii27ABoAXa0CZ/am9zhsKwiQugCNEIQAceeDXgNCiv1lGmDhgq2LZ561oE2RgFRIHLHC4y4mmg/////////rF2Vf79YKADWivXf//t/fqSLpbAcJD/84Rw+hLly0MvNpNtA6haNVwAxihTQRFA+6////9M31//9Zw3AWLl0xNpv////////////////////////////////////////////////////////////////8BWIgQieIAAdIJDeW7hxiai23ABoAW24Cj9M8xNnJh8F6ASCGiIyCh8nQtqBYgavsWHLAGBGEUTME0HZE2JkmgSAgaoMOFL/////////i9Tb/0hOaTpP/////6BmCQIBiSQU+b/84Rw/xNpw0EvKpRtg+haNYwATCgJ////61FrdH/+yRMjqAxBoBg0Mgb3Df/////////////////////////////////////////////////////////////////////wE0AwSheUWoeVtJSi23ABoAW7YDn91bWdnMTgpyHgsKNyKAolKj90TEJBydUYpL9AzC9AA1kdiaCv////////5iV//xlGt////+7azIjQa2A4hGaQdH2/f//Wo/Vv//n/84Rw/xPxwz8vKpRtgtBCLMwARiXSAAA2D1CfWiEf/////////////////////////////////////////////////////////////////////////////////////gqwEIAL0AAX5+zDlDCgUXEmuAW3YCj/O+uQkAegYWcCESBYkNoIRAJAS4vWUUi8AAAFSYdxVNkTYvEyPojQargNKPHORVdn////////8wJf/8ctV//////ueEdANbhfkRf/84Rw/xO9w0EvKpNtgzhSOYwARClv6v//10WU3//pGIETIeYnTZ8L///////////////////////////////////////////////////////////////////////////H1CCAwC9ZYUFCBdSAQSgBoASSUDn/v7miqMg9AeWcCQcQANg/YFp5WZ6igtEA4caOaH2TuePlQPSAuaFvNE1q////////+olCt/9Yzi7f/////WcDHwRx/////9TrQ///84Rw/xPpw0EvKpRtgugCNMwAAAD90TMG2IsaYfn/////////////////////////////////////////////////////////////////////////////////////////jwkgYIiABXo7FhKAASgBtgSSQB3//c0iPA9EakHVChwkREwDhR1WszY6AINK7Jq1rOFMXQC7EE3AzpYTdnb////////ypL/8a9//////rUBGgZiNf///////9ZkCGLz/84Rw/xQFwTkvKpBtgrgCOOgAAACv//////////////////////////////////////////////////////////////////////////////////////////////////////8AAkomCAF9dtCiASkloASW0Ayvb/pNUSBLpjmAtFGyCQMCRwupI0UTYZ4CigdyKSPZzxuGNQLfSEPt/////////nD3/5Y//////0ViOQXwkX/////f//+6IuIYhsL/84Rw/xRBwTkvHo1tAjgCMOQAAAA////////////////////////////////////////////////////////////////////////////////////////////////////8aACBFCAAN+26gSCAQSkGSASSQDH/X1vKigBaBmDQcBZqaFQKFG6iHIl0DJhxiGxESsjpHSMF+BhKgGkoiERDzA0Psff////////qPf/k3//////pjEA4ln////////r/84Rw/xP5wTsvHpJtgrgCNPwAAADFUoL/////////////////////////////////////////////////////////////////////////////wAAoKII5DQaVX+p2QgoaXP8clX/KYrgF8EjgAeSE3gA//4HP/9rnEIuDNRZCSIPzHEEggCgEvLzMbqBDwNENDNmhPmjs7mpsaBZMC4Iejz6/////////rPf/k7//////w+DJb////////4wpTR//84Rw/xIpwTsvHo1tBljOfpQCpG3/////////////////////////////////////////////////////////////////////////////////////////////////////4EiBAdEIiIX9yBygASkpygSSQAz//7mnCLRBqEBEjIkGLgGEZEkeYGxKACqh3IqX6ljoAetA2ZYcsuGabOat////////yrf/kP//////YMga0b////////xIHX//////84Rw/xQNvzU/Ko1sAphaMQAABCj////////////////////////////////////////////////////////////////////////////////////////////////////////wKgKBAIYP/iqAASgGsASSQB3/+ueQEsJLF4KDnHWFAx9t0kSiBUST6ROl5FJFEvEVLwJDwCrA0Um/////////zv/8vf/////+Pwru3////////UPyH///////////84Rw/xRRwTsvHoptAhgCNOQAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////9Ag3MBAPgAaBEYoA22wDv/9NyA3B4mYAmHAtCIKEAsL0F1JdZRSLwAwAO0xPGqTaZME2F8ANoDFsN0K/////////1v/+Xf//////Ph6/////////c1///////84Rw/xSdvzkvHo1tAYgCXOQAAAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////EjABkngAZwEo2A22wBn/+mqKUqCYUUEYikQpUGyfZ0CUmgBRYvOWj6CajIxJohoISwHDNjNGukz/////////f/3kv//////FYFv////////qJ2/////////84Rw/xS5vzE/Ho1sAVACXMwAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////4QiJkAhLgAbor3AfbYB3/+uacaNkTIEiYFkhWCQIAYKTi9ZNsUwADo00E1V7GZgBUCBtQQ7zRNej//////3//R//yP//////QQjZv////////jr//////////84Rw/xSZvzE/HodsAYgCXNAAAAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////8GEHRFLgYbgH7AbbYAz//bNc0lcY0GCkhQwOFn26KRkCAcXlmSKl0UjEjgQDwNgKHCk2pv////////T/+///////hEU/////////Gf//////////////////84Rw/xS1vzEvHodsAVACXOAAAAD//////////////////////////////////////////////////////////////////////////////////////////////////////////////8AaBmjADDIv4AAbYBn/0/snTDUARPSQFrAaNFdtRDkTUDDgRJTY1SbzQ3FAAFbR2G6Cv/////////////////8dDH////Lf////////////////////////84Rw/xTNvTEvHoVsARgCXMgAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////8EEUAhAWAACILYAASABn//61LUUwaJAFGIwQaBQywZqqOkeo3AxwkQOgbs6DpLMiNAeoAxZ8ZY6pn//////////////////oC////////////////////////84Rw/xSdUTEvFodcAYgCXOQAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////DBKhOCgBCgACgC0AAQO//+pajqlhMMJ/NRXQUSIv0HOAhEFycWpfcuB8YLkhtnnX//////////////////gv//////////////////////////////////////84Rw/xR1TykvFoVcAcACXOgAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////ghGohEqigACkLcAAWgBn//+1YQgAcbLYoQCxFDqLyJMgPFjRSRSay1HR9A1WgRMD+YLWgv/////////////////9B////////////////////////////////84Rw/xSRTSvbHoJaAYgCXOQAAAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////+SqIUoKAABgKQAAMAZ///oUBXgWbDaBqCBtmXkXrI1IvASMDFZ292NwwKDsJCH+r/////////////////+P/////////////////////////////////////84Rw/xS5Ty0vFoJcAVACXMwAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////AAAJJNIBiAACEqcAAO//+qswWYCewR0W3+HvqPn/qY7QGOQ/GfP///9QGMPHRK+1cRF///////////////////////////////////////////////////////84Rw/xR1TyUuHoJcAcACXPwAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////4CCNMAZjALV6AAGAd//q9almAQ8Z4nQmBAUBF1W6aJGggKkVV+01D2gY7FuNXiH////////8p////////////////////////////////////////////////84Rw/xSYaycsHlk2gYgCXOQAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////8IpA4QUSAAJkqYAAMA6n/6/qqCJwLsIim6LISHLn41cpoEEQrHvP3/63HBGqcokvwE5n////////9H///////////////////////////////////////////84Rw/xScayLOHjQ2AYgCXNAAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////2QS0JcYIjq+EKVtIJTj22W2w+VivlYp5mRtYbvLncJVTsHVGlWEG1scuU7pTqmAOaV667sSmflGMsldpWwkjK4kw26RV+InTWK+QDIhFAsAyZwCH3aKv+9P///84Rw/xR8ayUuHnk2AcACXOgAAAD/////////////////////////////////////////////////////////////////////////////////////////////////////4cohtt4hv+wcgLBqYf/21A+Wk4bQ/C0HxQfZ2tQkRYugbZKopQaIloS/////////////////////////////////////////////////////////////////////////84Rw/xQMeR7cGzk4ApACNOQAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAt2lt3/////////////////////////////////////////////////////////////////////////////////////////////////////////////////84Rw/xScUxYkAWk2gYgCXOQAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/84RQ/xUAAS4AAAAAAKgCXKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';

const wrong =
    'data:audio/mpeg;base64,SUQzAwAAAAAAFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/84RwAA8I20hnp7ABAKgCXK1AAAAQ/ynG8pm+GBWOCfAWAbh4Q1fHxTLyJq9/TUMGhMqdvwEg8hEAmOb7Bw42JBYqv84EAmJwICJE35wJBMiMDBZTb3scCWT38WUn8vf5pSlKP3ylNvfF7/z03+i8+GBOFgffJr//n+XfE7wfw+XfX9euf5d/D+fLv4f/gAC0BLEAACzRAABlA4AAAAC4YMCKDKh8xsEMBAhYdRsOBWTcgI2ZkEBKbGqGWijzLDv/84RwJheQ+VAzzegBAqBuQLWAEABOhmR4K/DgBiQ8prNxq5bMGDNFOFrCGK5RGuE6aflROc3JKGmlITyQGIhgjFwNMxGxfnP//M0NCDyPJkk513IoGTSaFgSgxAWYD/+4JmAMUTGeGg+XPwgM3rf43B0B////Hi3bjQ9VhhlCwb3P0JGqffMoCZdN4tC3////8to7VkDBsKii//iwVEQbBk27tXbv939Yp/6tt/+AAAAMAfzARSiHfyVnJhUUVVj/84RwCg7A40ss7dABgzBWNQHFAABNMyECBZggWYRinTHIBAmXUJZFBWDkvldU8XWLJqOhrN2LdJJKSNjopEAwGBoCoe8dcmS6XTVvzA3WVyeJAnyfJ7SLxeNikHpACiAM+wDlyACFhcRss1b//dSRKA2UG3ESTIqTpeNv61oomgoCAAEAAA7NUf//kFQcUKd1aF1t4EIx/pGyxXZZRyzHazVA2LIayyX2O2LfOWrtSnytcz33dBBqLhkyDxVnKU3/84RwMgvEv0nbazBJCaESbggAlHDu/6R10zIyNihNzAuGZHFQ2I4EGCCADiJlVNKtK9v+8zQlRF/1pBEOiFjY5QAAGxA2BwBdAfudinhAYdnYgM///QkHsch4LJoqkE0jGqGBNADieHCm5JJJJKE0mgRaKNfaZJzAzVtWOjjWu63/83vmuXNW8LOFNSwqUECUcHHm5RFt8t2OZ9XLzBqVvUtrXFRUYlYwWPL22fj////qzQ8af+MDkmp0of627QD/84RwWApAvUHbZwtJDYESmggpnnIOmB5oTDoAOl//62VpJC5c9uXaJYk94dbb/+//7WeRozXBY4TE3xa509ZtpxdksKaUliORyRtpKNMuXy76xXCBmIdmiGkjLpTlj5utJzE4sumhYKZBBiFIGuHskgibMy3WmmyJomIQhCqlhcJRzqwdMHJBAsAsBorBNDrlO///+XkXYf8///MfUHrcSNrtNmJgVGabAwPAZIVDItLf/G17F21qpOJSip4C4eD/84RwewtE5ScsZghKD4kSXghK3nAJkvzJFe5//1fP3SdzhwlO/iRsxJ493kBRGCCyNwD3munYkpq02mtshS1bAKIBM2KEQ4C71L3H5nvV6+rLlkbleyLKuej5KEuUSBNre7XiZ3lgf6STHVEIUT1uQ1vOqVQMQUQno9IaoMobahXctKW1b2+N6/z82hWcGRT2+8Zz///n+low3lusRm+icq6lafYwbrCrTxA0rEAbQ/Jn+7skXzTtScq1aSBn6fX/84RwjQ0E4RrMae9Ki6iiOZDDcEyItZPJFb7/L+NwIhAL61Hl1M75pKwxFAOHCIrGO2e/rXf1zGxSvvqEQ3L3CdiUqDHVaasgs7y7ne7Rr5oy6c3Shi1W3TgpIruV81sRcAq4yL+7w9Zp/v/5xn//X05UZMSjfQAFJxlJTUFO0reJQwUWkDJkihQihJvGLRmUd/4aOQcMbjBruVNObUvyVuTY1yN0DlNdiEu//+PbVNS172kLDKlUQJ+fK4p6f/3/84RwoQtEwxcYbw9IB3BaOiRORij32LbyPRvyqo7Ep48KKyxn6vVyeO4YZKY0ak9t4zv//7/+M++KLESLF/SkyFyYiSWyS1N0JA/tFu9tOIUAdhiZVar+nRMXreGqt/CRQ8/yCUxgXA7czSUgvhKcXzIGLlcmgd5hiTk7V6V1/961rRNJec4RZzIrCEoAZBUk2bn1pzxdR9MXY5GHLW1J/nRuLwPjM3Nn8M6////37l30vqXiq///////////////84Rw1Aq4wR0cYe9ICqiaNgjC8E3///////////////////////////////////////////////////////////////////////////////////////XgNBhFkcjFhihh6epbQ1QRoGkR3gZWGr6paIDAJWRlh7L5c1iHS3ZuOGsYgZAbX6NwIdBoJxQGwQtUEgg4NpQEECBBUEzDAMg5KgbrBQI1mjUACp56aHY0UAgkEvWMAGYoahiiAEEARCP/84Rw/hKQvRrYPitIBWAuMZAb0gTjkOQ5DkOQ7jvxu3hYxzjimBadFOD3AXY7lW+4CY666Z2IcoWtv3HFA11xepSYyuX3H/h/uGG6+eFPb7hh+fcKen7hhvPPCnp+4Yfnnqnt91z8+6zz/+fn3VPn3XPz7hT2+4Yfn2pG7esOV43L6j/w/bww3T0/a9t6wffl///3h/D5+AA5QACAAADguQAgYWORsRXGPxAaXVBiwDgGBlCFZCZ2BnmSgHiLBAz/84Rw/xq1bTTKrOQAAPgCfK1AAAA+GXGS1seY6PmSKQcelzTUo1JFwjM1pqYjBzBhgxUrMkKX1kiqKCb/3VMHKhY1NkIDBQVYiXwFggcSsGlMMAlGSzkXFohUMMsEggCeNQCZZgYydDQ9WpvqkobDVnoCBEEblNejNamEYAn1N4//5a///7tS5Tyi5N1K3/r9Zd/9f///P+7crb1rPDWeGHd////6/WX//f/X9//p4xKHbXInlGZ6BpNP371vvP//84Rw0BxVhU5fzmwBAeACXLWAAAD91578d///////9X/m/Bk27/i////AAAgAAAAkO1J9uXgfgA0QAwSDAEwwhNEpzuHwIDoW7IGCm5qlIiVkr+qqggDDgGAVMS7peE1J5McDQcCurNFUmieP5ERjhmgyEIyCwIGQImorwBoIDGngOfAAUBB8wuI+ij10iLHxSIBgMDIJwNUBIMQEZkgpqZGzo0SyXUatNmT1IUVrfV////////7f/6knKIyoY1D/84RwkBL5X00v7dABgjACaNHAAABsGidi2Yom8DgAUMpA6/vcsEDJ0V3NsAKAXXHhlojliwKccqgYUXW7hZAvGkQGA1PmhNHSAQDS0zohc435lap3vNf//5f5B0aDQhSVUkr7l3B6zSvKwWg007Pf3//n6p6BywYGBnWnV+fO5fljEmwTNLD+xgcCwYCw1QkPf/////XIgAAsGBgguQkIx+/XSAAJzMBgzaOb/7YCgBQmEBUboiMliMcNBor2DXD/84Rwmg4knUMvbzlJBAhKppgIDCeZTViDkxN9EwpiHXWGCpuI5MFnr337mHbEVZa7aSiPr/SuIphCywsaZMhl1iboKDbg7jVobltNN3LMxxnr+poBQA2SI098H2aLHf3qRymtzeEttWrCApScSKU17htn////C5gCxCm0QZDjhpou+tycmM5TvFPrHu4Yvv/eOGWOaccuwSUbZc7qP5VWqUUdtFdyV9ClW2u3XWgDAGXA0fDBcM4rZCW1iNoA01H/84Rwww9Eo0Eva1lJDCDCoqwL8G5/oi1H6qQJF2eq/TBFSjTseady+peoHekkSjkMrVUcZAyWSQyiYicpycrhEeNLQ7Jndw7zD/sP7KHdXYIxjHGfSDJ+US6d3rGmxctyZZdyv8FiKsNEMEKzcjdExMRFxJCRHICirLPM65UfBCA8I0BWHoCSrpVr/tRSWQ63Rtx4lA0+AUByv33ApUkkts0gL6JXAQHDQgKgNCTCXzsRCSzFaM0EbyjM00Omacb/84Rwww2oozksazlJDICihrBrMExUqnq3LVmMO5A7xzC63hel922gNp0qrOEncdDJngLqh+LS6/l9zWP01+Vuq/aPy3XiiF3L9/vOgxxxv6mO1Y2xWqqwghsEOUVlNYKAFtZdcqKTqBZKxVpIbht9SEbepuyVgyWXxRkYWPCslDs0l/pB2xL6tq1GJ2MuK/SQhjxKXFv1aakfqJzsWdtubluyrpr0/BUEKnR2G/K0wFZnqm9Zb33u8edoH+7f3zv/84RwzgxAnzMsazlJB3hadrBJsCiP/93KZilyl1a3////////////////////////////////////////////////////////7EScgpecrRCaYbojIQA1lYMI7Z+YzCTQZ+nAfRkRne0SfFioZJuKEhtaSBmAmHSHFbKx3rn63hltweJlmU6tSYEdNMmNduhQZpDkhJSMzNi9JI3XCoyYCxnUh6byyy5zXf3XpIff1wZDWq2t6/9fWt2Asbc3atL/84Rw+RBMoxrYaxhICJBmPgh5sEmP//////////////////////////////////////////////////////////////////////najAksHrRMf25NDcACxmS2mbVdqzLiMWL5UUbsAxzt2MxRFIoREaB7Z27YLMA+CQ3qXuet0k07bmp9LMNQJgAjFxhuVMbptqZXI5z+O9hbSKDnCzhnwFQC+FImi00a/RROmxASUKilWbbLxtPz////////////84Rw/xEwmRjcafhICFBqNYzCcEj///////////////////////////////////////////////////////////////////////////////7ioAGDMCdQMxlMTwlHgFQAg0X/JIbWlv1HMTC5VFOPA+XH0gARoD+yyAq2f45YfE3WivgHYVcbed+XcV/U14i5M9kfvVazsRphNHTCVkuLf5/94+oxxHS/1jN///L7Kd//////////////////////84Rw/xH4mRs4ZfNIhsBaNZBiGCj///////////////////////////////////////////////////////////////////////////8kFRQgIjrmB/MVvOURhoYGR4ycYS1LQxiRmkkosSiqZVKUgsikmZAYCtisiRW361gvo1mIQ5CmJXMTW18mpqauv9sJgdHVZ4FTvgqV6v//////////////////////////////////////////////////84Rw/xGglxjYYe9Ih2hmLXh48En//////////////////////////////////////////////////////////////////////////////////////2JkZhEgLqIG1U4KRUBAWb6qryKioOj/////////////////////////////////////////////////////////////////////////////////////////////////////////////////84Rw/xKgXxrYJes2BWhaLQAw0Cj////////////////////////////////////////////////////////////////////////////////////////////////////////////////gAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/84RQ/xTwAS4AAAAAAOACXMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
class SoundControl {
    private sounds: any;
    public constructor() {
        this.sounds = {};
        lego.event
            .on(KeyboardEvents.KeyClicked, this.playClick, this)
            .on(GameModelEvents.WrongsUpdate, this.playWrong, this)
            .on(GameModelEvents.RightsUpdate, this.playRight, this);
    }

    public loadSounds(): void {
        this.sounds.click = new Howl({ src: click });
        this.sounds.wrong = new Howl({ src: wrong });
        this.sounds.correct = new Howl({ src: correct });
    }

    private playClick(): void {
        this.sounds.click.play();
    }

    private playWrong(): void {
        this.sounds.wrong.play();
    }

    private playRight(): void {
        this.sounds.correct.play();
    }
}

const SoundController = new SoundControl();
export default SoundController;