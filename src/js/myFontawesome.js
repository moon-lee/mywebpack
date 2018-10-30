import { dom, library } from "@fortawesome/fontawesome-svg-core";
import { faCloud } from "@fortawesome/free-solid-svg-icons/faCloud";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faTable } from "@fortawesome/free-solid-svg-icons/faTable";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons/faTachometerAlt";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import { faWeight } from "@fortawesome/free-solid-svg-icons/faWeight";
import { faMoneyCheckAlt } from "@fortawesome/free-solid-svg-icons/faMoneyCheckAlt";
import { faGooglePlusSquare } from "@fortawesome/free-brands-svg-icons/faGooglePlusSquare";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons/faPlusSquare";
import { faMinusSquare } from "@fortawesome/free-regular-svg-icons/faMinusSquare";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
import { faCogs } from "@fortawesome/free-solid-svg-icons/faCogs";
import { faPalette } from "@fortawesome/free-solid-svg-icons/faPalette";
import { faClipboard } from "@fortawesome/free-regular-svg-icons/faClipboard";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { faEdit } from "@fortawesome/free-regular-svg-icons/faEdit";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons/faTrashAlt";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faClock } from "@fortawesome/free-regular-svg-icons/faClock";

export function init_fonts() {
    library.add(faCloud, faTable, faBars, faTachometerAlt, faSignOutAlt, faGooglePlusSquare, faWeight, faMoneyCheckAlt);
    library.add(faPlusSquare, faMinusSquare, faCog, faCogs, faPalette);
    library.add(faClipboard, faEllipsisV, faEdit, faTrashAlt, faPlus, faClock);
    dom.i2svg();
}
