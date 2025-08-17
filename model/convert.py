import pandas as pd

def convert_csv_format(input_df):
    header_mapping = {
        'dst_port': 'DestinationPort',
        'flow_duration': 'FlowDuration',
        'tot_fwd_pkts': 'TotalFwdPackets',
        'tot_bwd_pkts': 'TotalBackwardPackets',
        'totlen_fwd_pkts': 'TotalLengthofFwdPackets',
        'totlen_bwd_pkts': 'TotalLengthofBwdPackets',
        'fwd_pkt_len_max': 'FwdPacketLengthMax',
        'fwd_pkt_len_min': 'FwdPacketLengthMin',
        'fwd_pkt_len_mean': 'FwdPacketLengthMean',
        'fwd_pkt_len_std': 'FwdPacketLengthStd',
        'bwd_pkt_len_max': 'BwdPacketLengthMax',
        'bwd_pkt_len_min': 'BwdPacketLengthMin',
        'bwd_pkt_len_mean': 'BwdPacketLengthMean',
        'bwd_pkt_len_std': 'BwdPacketLengthStd',
        'flow_byts_s': 'FlowBytes/s',
        'flow_pkts_s': 'FlowPackets/s',
        'flow_iat_mean': 'FlowIATMean',
        'flow_iat_std': 'FlowIATStd',
        'flow_iat_max': 'FlowIATMax',
        'flow_iat_min': 'FlowIATMin',
        'fwd_iat_tot': 'FwdIATTotal',
        'fwd_iat_mean': 'FwdIATMean',
        'fwd_iat_std': 'FwdIATStd',
        'fwd_iat_max': 'FwdIATMax',
        'fwd_iat_min': 'FwdIATMin',
        'bwd_iat_tot': 'BwdIATTotal',
        'bwd_iat_mean': 'BwdIATMean',
        'bwd_iat_std': 'BwdIATStd',
        'bwd_iat_max': 'BwdIATMax',
        'bwd_iat_min': 'BwdIATMin',
        'fwd_psh_flags': 'FwdPSHFlags',
        'bwd_psh_flags': 'BwdPSHFlags',
        'fwd_urg_flags': 'FwdURGFlags',
        'bwd_urg_flags': 'BwdURGFlags',
        'fwd_header_len': 'FwdHeaderLength',
        'bwd_header_len': 'BwdHeaderLength',
        'fwd_pkts_s': 'FwdPackets/s',
        'bwd_pkts_s': 'BwdPackets/s',
        'pkt_len_min': 'MinPacketLength',
        'pkt_len_max': 'MaxPacketLength',
        'pkt_len_mean': 'PacketLengthMean',
        'pkt_len_std': 'PacketLengthStd',
        'pkt_len_var': 'PacketLengthVariance',
        'fin_flag_cnt': 'FINFlagCount',
        'syn_flag_cnt': 'SYNFlagCount',
        'rst_flag_cnt': 'RSTFlagCount',
        'psh_flag_cnt': 'PSHFlagCount',
        'ack_flag_cnt': 'ACKFlagCount',
        'urg_flag_cnt': 'URGFlagCount',
        'cwr_flag_count': 'CWEFlagCount',
        'ece_flag_cnt': 'ECEFlagCount',
        'down_up_ratio': 'Down/UpRatio',
        'pkt_size_avg': 'AveragePacketSize',
        'fwd_seg_size_avg': 'AvgFwdSegmentSize',
        'bwd_seg_size_avg': 'AvgBwdSegmentSize',
        'fwd_byts_b_avg': 'FwdAvgBytes/Bulk',
        'fwd_pkts_b_avg': 'FwdAvgPackets/Bulk',
        'fwd_blk_rate_avg': 'FwdAvgBulkRate',
        'bwd_byts_b_avg': 'BwdAvgBytes/Bulk',
        'bwd_pkts_b_avg': 'BwdAvgPackets/Bulk',
        'bwd_blk_rate_avg': 'BwdAvgBulkRate',
        'subflow_fwd_pkts': 'SubflowFwdPackets',
        'subflow_fwd_byts': 'SubflowFwdBytes',
        'subflow_bwd_pkts': 'SubflowBwdPackets',
        'subflow_bwd_byts': 'SubflowBwdBytes',
        'init_fwd_win_byts': 'Init_Win_bytes_forward',
        'init_bwd_win_byts': 'Init_Win_bytes_backward',
        'fwd_act_data_pkts': 'act_data_pkt_fwd',
        'fwd_seg_size_min': 'min_seg_size_forward',
        'active_mean': 'ActiveMean',
        'active_std': 'ActiveStd',
        'active_max': 'ActiveMax',
        'active_min': 'ActiveMin',
        'idle_mean': 'IdleMean',
        'idle_std': 'IdleStd',
        'idle_max': 'IdleMax',
        'idle_min': 'IdleMin'
    }

    new_column_order = [
        'DestinationPort', 'FlowDuration', 'TotalFwdPackets', 'TotalBackwardPackets',
        'TotalLengthofFwdPackets', 'TotalLengthofBwdPackets', 'FwdPacketLengthMax',
        'FwdPacketLengthMin', 'FwdPacketLengthMean', 'FwdPacketLengthStd',
        'BwdPacketLengthMax', 'BwdPacketLengthMin', 'BwdPacketLengthMean',
        'BwdPacketLengthStd', 'FlowBytes/s', 'FlowPackets/s', 'FlowIATMean',
        'FlowIATStd', 'FlowIATMax', 'FlowIATMin', 'FwdIATTotal', 'FwdIATMean',
        'FwdIATStd', 'FwdIATMax', 'FwdIATMin', 'BwdIATTotal', 'BwdIATMean',
        'BwdIATStd', 'BwdIATMax', 'BwdIATMin', 'FwdPSHFlags', 'BwdPSHFlags',
        'FwdURGFlags', 'BwdURGFlags', 'FwdHeaderLength', 'BwdHeaderLength',
        'FwdPackets/s', 'BwdPackets/s', 'MinPacketLength', 'MaxPacketLength',
        'PacketLengthMean', 'PacketLengthStd', 'PacketLengthVariance',
        'FINFlagCount', 'SYNFlagCount', 'RSTFlagCount', 'PSHFlagCount',
        'ACKFlagCount', 'URGFlagCount', 'CWEFlagCount', 'ECEFlagCount',
        'Down/UpRatio', 'AveragePacketSize', 'AvgFwdSegmentSize',
        'AvgBwdSegmentSize', 'FwdHeaderLength',
        'FwdAvgBytes/Bulk', 'FwdAvgPackets/Bulk', 'FwdAvgBulkRate',
        'BwdAvgBytes/Bulk', 'BwdAvgPackets/Bulk', 'BwdAvgBulkRate',
        'SubflowFwdPackets', 'SubflowFwdBytes', 'SubflowBwdPackets',
        'SubflowBwdBytes', 'Init_Win_bytes_forward', 'Init_Win_bytes_backward',
        'act_data_pkt_fwd', 'min_seg_size_forward', 'ActiveMean', 'ActiveStd',
        'ActiveMax', 'ActiveMin', 'IdleMean', 'IdleStd', 'IdleMax', 'IdleMin'
    ]

    df = input_df

    df.rename(columns=header_mapping, inplace=True)
    
    df['FwdHeaderLength.1'] = df['FwdHeaderLength']

    final_column_order = new_column_order[:] # copy
    final_column_order[final_column_order.index('FwdHeaderLength', 50)] = 'FwdHeaderLength.1'

    df_converted = df[final_column_order]
    return df_converted

if __name__ == "__main__":
    output_file = "model/data/converted.csv"
    data = {'plain': 0, 'ddos': 1, 'goldeneye': 2, 'nmap': 3, 'slowloris': 4, 'slowloris2': 4}
    dfs = []
    for fp, lab in data.items():
        df = pd.read_csv(f'model/data/real/{fp}.csv')
        if fp == 'plain':
            df = df[df['src_ip'] == '192.168.124.93'].copy() 
        converted = convert_csv_format(df)
        converted['Label'] = lab
        dfs.append(converted)
    df = pd.concat(dfs)
    print(df['Label'].unique())
    df.to_csv(output_file, index=False)