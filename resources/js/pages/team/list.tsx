import { Modal, ModalHandles } from "@/components/modal";
import Table from "@/components/table";
import { swal } from "@/components/ui/toast";
import AppLayout from "@/layouts/app-layout";
import team from "@/routes/team";
import { BreadcrumbItem, SharedData, TableHeader, Team } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import { Edit2Icon, Edit3Icon, EditIcon, PenIcon, TrashIcon } from "lucide-react";
import { useRef, useState } from "react";
import Swal from 'sweetalert2';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teams',
        href: team.index().url,
    }
];



export default function ListTeam() {
    const { teams }: { teams: Team[] } = usePage<SharedData>().props;

    const { errors } = usePage().props;

    const headers: TableHeader[] = [
        { title: "Nombre", align: "left" },
        { title: "Correo electrónico", align: "left" },
        { title: "Acciones", align: "center" },
    ];


    const modalRef = useRef<ModalHandles>(null);
    const [teamEdit, setTeamEdit] = useState<Team>({
        name: '',
        email: '',
        id: 0
    });

    const [teamEdited, setTeamEdited] = useState<Team>({
        name: '',
        email: '',
        id: 0
    });

    const openModalWithTeamEdit = ({ team }: { team: Team }): void => {
        setTeamEdit(team);
        setTeamEdited(team);
        modalRef.current?.abrirModal();
    }


    const submitEditTeam = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.put(team.update(teamEdited.id).url, teamEdited, {
            onSuccess: (res) => {
                modalRef.current?.cerrarModal();
                swal.toast({
                    title: 'Equipo actualizado correctamente',
                    icon: 'success'
                });
            },
            onError: (res) => {
                console.log('ha fallao perri')
            }
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Teams" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Teams</h1>

                <Table headers={headers}>
                    {teams.map(team => (
                        <tr key={team.id}>
                            <td>{team.name}</td>
                            <td>{team.email}</td>
                            <td className="text-center">
                                <button className="btn hover:bg-accent-foreground hover:text-black/60 transition" onClick={() => openModalWithTeamEdit({ team })}><PenIcon className="size-6" /></button>
                                <button className="btn hover:bg-accent-foreground hover:text-black/60 transition"><TrashIcon className="size-6" /></button>
                            </td>
                        </tr>

                    ))}
                </Table>
                <Modal
                    ref={modalRef}
                    title={"Editar " + teamEdit.name}
                    footer={
                        <div className="text-right">
                            <button
                                type="submit"
                                form="form-edit-team"
                                className="btn btn-secondary"
                            >
                                Guardar
                            </button>
                        </div>
                    }
                >
                    <form action="" id="form-edit-team" onSubmit={event => submitEditTeam(event)}>
                        <div className="form-control">
                            <label htmlFor="">Nombre</label>
                            <input type="text" name="email" onChange={e => setTeamEdited({...teamEdited, name: e.target.value})} value={teamEdited.name}/>
                            { errors.name && <div className="error">{errors.name}</div>}
                        </div>
                        <div className="form-control">
                            <label htmlFor="">Email</label>
                            <input type="email" name="email" onChange={e => setTeamEdited({...teamEdited, email: e.target.value})} value={teamEdited.email}/>
                            { errors.email && <div className="error">{errors.email}</div>}
                        </div>
                    </form>
                </Modal>
            </div>
        </AppLayout>
    );
}
